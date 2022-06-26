from flask import Blueprint, redirect, render_template


bp = Blueprint("mannual", __name__)


@bp.route("/mannual")
def mannual():
    return render_template("mannual/mannual.html")