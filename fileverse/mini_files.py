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

bp = Blueprint("mini_files", __name__)

@bp.route("/mini-files")
@login_required
def mini_files():
    db = get_db()
    uploads = db.execute(
        "SELECT id, filename, date, size FROM user_upload"
    ).fetchall()
    return render_template("files/mini-files.html", uploads=uploads)