import os, json, zipfile, io, uuid
from flask import (
    Blueprint, flash, g, 
    redirect, render_template, 
    request, url_for, current_app, 
    Response, stream_with_context, jsonify, session
)
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename
from fileverse.auth import login_required
from fileverse.db import get_db

bp = Blueprint('files', __name__)

@bp.route("/files")
@login_required
def files():
    return render_template("files/files.html")

# See the details about why favour request.stream over request.files/request.form
# https://izmailoff.github.io/web/flask-file-streaming/
#
# Don't touch request.files, and request.form! 
@login_required
@bp.route("/files/upload/<filename>", methods=("POST", ))
def upload(filename):
    db = get_db()
    filename = secure_filename(filename)
    unique_name = str(uuid.uuid4())

    save_path = os.path.join(current_app.config["UPLOAD_FOLDER"], unique_name)
    chunk_size = 4096  # set chunk size to 4 Mb 
    # save the file
    with open(save_path, "bw") as f:
        try:
            while True:
                chunk = request.stream.read(chunk_size)
                if len(chunk) == 0:
                    break
                f.write(chunk)
        except:
            print("Error occur")

    # get the size of file and record the upload in database
    size = os.stat(save_path).st_size
    db.execute(
        "INSERT INTO user_upload (filename, size, path, owner_id) VALUES (?, ?, ?, ?)", 
        (filename, size, save_path, g.user['id'])
    )
    db.commit()
    new_record = db.execute(
        "SELECT id, filename, size, date from user_upload WHERE path = ? ", (save_path, )
    ).fetchone()

    json = { 
        "id": new_record["id"],
        "filename": new_record["filename"],
        "size": new_record["size"],
        "date": new_record["date"]
    }
    return json

def read_chunk(path_to_file, chunk_size):
    with open(path_to_file, "rb") as f:
        while True:
            data = f.read(chunk_size)
            if data: yield data
            else: break

@login_required
@bp.route("/files/download/<int:id>", methods=("GET", ))
def download(id):
    db = get_db()
    
    record = db.execute(
        "SELECT filename, path FROM user_upload WHERE id = ? AND owner_id = ? ;", 
        (id, g.user['id'])
    ).fetchone()

    if (record == None):
       return Response("invalid request", status=400) 

    path_to_file = record["path"]
    filename = record["filename"]

    return Response(
       stream_with_context(read_chunk(path_to_file, 1024)),
       headers={
            'Content-Disposition': f'attachment; filename={filename}'
       }
    )

@login_required
@bp.route("/files/download_files", methods=("POST", ))
def downloadFiles():
    db = get_db()
    fileIDs = None
    path_to_files = []

    content_type = request.headers.get("Content-Type") 
    if (content_type == "application/json"):
        fileIDs = request.get_json()["fileIDs"]


    for id in fileIDs:
        record = db.execute(
            "SELECT filename, path FROM user_upload WHERE id = ? AND owner_id = ?;", 
            (id, g.user['id'])
        ).fetchone() 

        if (record == None):
            return Response("invalid request", status=400) 
        path_to_files.append(record["path"])


    temp_filename = "/" + str(uuid.uuid4()) + ".zip"
    zip_path = current_app.config["ZIP_FOLDER"] + temp_filename
    print(zip_path)
    with zipfile.ZipFile(zip_path, mode="w") as zf:
        for path in path_to_files:
            zf.write(path)


    return Response(
       stream_with_context(read_zipfile(zip_path, 1024)),
       headers={
            'Content-Disposition': f'attachment; filename=downloads.zip'
       }
    )


def read_zipfile(zip_path, chunk_size):
    with open(zip_path, "rb") as f:
        while True:
            data = f.read(chunk_size)
            if data: yield data
            else: break
    os.remove(zip_path)


@login_required
@bp.route("/files/delete/<int:id>", methods=("DELETE", ))
def delete(id):
    db = get_db()
    record = db.execute(
        "SELECT path FROM user_upload WHERE id = ? AND owner_id = ?;", 
        (id, g.user['id'])
    ).fetchone()

    if (record == None):
       return Response("invalid request", status=400) 

    path_to_file = record["path"]
    os.remove(path_to_file)
    db.execute(
        "DELETE FROM user_upload WHERE id = ? AND owner_id = ?;",
        (id,  g.user['id'])
    )
    db.commit()
    return "Ok delete"


# For now return all the saved files
# Need to add auth in the future
@login_required
@bp.route("/filelist", methods=("GET", ))
def get_filelist():
    if ("user_id" not in session ):
        session.clear()
        return  Response("Invalid credential", status=400)

    db = get_db()

    records = db.execute(
        "SELECT id, date, filename, size from user_upload WHERE owner_id = ?;", 
        (g.user['id'], )
    ).fetchall()

    details = {"fileList": []}
    for record in records:
        details["fileList"].append( {
            "id": record["id"],
            "date": record["date"],
            "filename": record["filename"],
            "size": record["size"]
        })

    return jsonify(details)


