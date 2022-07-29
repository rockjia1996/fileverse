import os

from flask import (
    Blueprint, flash, g, 
    redirect, render_template, 
    request, url_for, current_app, 
    Response, stream_with_context, jsonify
)
from werkzeug.exceptions import abort
from werkzeug.utils import secure_filename
from fileverse.auth import login_required
from fileverse.db import get_db

bp = Blueprint('files', __name__)

@bp.route("/files")
#@login_required
def files():
    db = get_db()
    uploads = db.execute(
        "SELECT id, filename, date, size FROM user_upload"
    ).fetchall()
    return render_template("files/files.html", uploads=uploads)

# See the details about why favour request.stream over request.files/request.form
# https://izmailoff.github.io/web/flask-file-streaming/
#
# Don't touch request.files, and request.form! 
@bp.route("/files/upload/<filename>", methods=("POST", ))
def upload(filename):
    db = get_db()
    filename = secure_filename(filename)
    save_path = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)

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
        "INSERT INTO user_upload (filename, size, path) VALUES (?, ?, ?)", 
        (filename, size, save_path)
    )
    db.commit()
    new_record = db.execute(
        "SELECT id, filename, size, date from user_upload WHERE path = ? ", (save_path, )
    ).fetchone()

    #return str(new_record["id"])
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

@bp.route("/files/download/<int:id>", methods=("GET", ))
def download(id):
    db = get_db()
    
    record = db.execute(
        "SELECT filename, path FROM user_upload WHERE id = ? ;", 
        (id, )
    ).fetchone()
    path_to_file = record["path"]
    filename = record["filename"]

    return Response(
       stream_with_context(read_chunk(path_to_file, 1024)),
       headers={
            'Content-Disposition': f'attachment; filename={filename}'
       }
    )

@bp.route("/files/delete/<int:id>", methods=("DELETE", ))
def delete(id):
    db = get_db()
    record = db.execute(
        "SELECT path FROM user_upload WHERE id = ? ;", 
        (id, )
    ).fetchone()
    path_to_file = record["path"]
    os.remove(path_to_file)
    db.execute(
        "DELETE FROM user_upload WHERE id = ?;",
        (id, )
    )
    db.commit()
    return "Ok delete"


# For now return all the saved files
# Need to add auth in the future
@bp.route("/files/<username>", methods=("GET", ))
def get_filelist(username):
    db = get_db()
    records = db.execute(
        "SELECT id, date, filename, size from user_upload;"
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