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
def min_files():
    return render_template("files/mini-files.html")