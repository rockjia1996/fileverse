import os

from flask import (
    Blueprint, flash, g, 
    redirect, render_template, 
    request, url_for, current_app, 
    Response, stream_with_context
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


@bp.route("/files/upload", methods=("POST", ))
def upload():
    db = get_db()
    save_path = current_app.config["UPLOAD_FOLDER"]
    upload_files = request.files.getlist("upload")
    
    for upload in upload_files:
        filename = secure_filename(upload.filename)
        path = os.path.join(save_path, filename)
        size = 1
        upload.save(path)

        db.execute(
            "INSERT INTO user_upload (filename, size, path) VALUES (?, ?, ?)", 
            (filename, size, path)
        )
        db.commit()
    return "Ok"


def read_chunk(path_to_file, chunk_size):
    with open(path_to_file, "rb") as f:
        while True:
            data = f.read(chunk_size)
            if data: yield data
            else: break



@bp.route("/files/download/<int:id>", methods=("GET", ))
def download(id):
    db =get_db()
    
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
