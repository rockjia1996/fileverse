from flask import (
    Blueprint, flash, g, 
    redirect, render_template, 
    request, url_for
)
from werkzeug.exceptions import abort
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


@bp.route("/upload", methods=("POST", ))
def upload():
    db = get_db()
    return request.url
