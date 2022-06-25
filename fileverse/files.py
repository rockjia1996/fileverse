import os

from flask import (
    Blueprint, flash, g, 
    redirect, render_template, 
    request, url_for, current_app
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
    files = db.execute(
        "SELECT id, filename, date, size FROM user_upload"
    ).fetchall()



    return render_template("files/files.html")


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
            "INSERT INTO user_upload (filename, size)",
            "VALUES (?, ?)", (filename, size, path)
        )
        db.commit()
    return "Ok"


@bp.route("/files/download/<int:id>", methods=("POST"))
def download(id):
    return "Ok"