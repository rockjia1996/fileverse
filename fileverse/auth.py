import functools
from flask import (
    Blueprint, flash, g, 
    redirect, render_template, 
    request, session, url_for, Response
)
from werkzeug.security import check_password_hash, generate_password_hash
from fileverse.db import get_db

bp = Blueprint("auth", __name__, url_prefix="/auth")

@bp.route("/register", methods=("GET", "POST"))
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        db = get_db()
        error = None

        if not username: error = "Username is required"
        if not password: error = "Password is required"

        if error is None:
            try:
                db.execute(
                    "INSERT INTO user (username, password) VALUES (?, ?)",
                    (username, generate_password_hash(password)),
                )
                db.commit()
            except db.IntegrityError:
                error = f"User {username} is already registered."
                flash(error)
                return Response(error, status=400)
            else:
                return redirect(url_for("auth.login"))
        else:
            flash(error)
            return Response(error, status=400)
    return render_template("auth/register.html")

@bp.route("/login", methods=("GET", "POST"))
def login():
    if request.method == "POST":

        # TO DO: Add a complete fix on handling the invalid request
        if len(request.form) != 2:
            return redirect(url_for("index.index"))

        username = request.form["username"]
        password = request.form["password"]
        db = get_db()
        error = None 
        user = db.execute(
            "SELECT * FROM user WHERE username = ?", (username,)
        ).fetchone()

        if user is None: 
            error = "Incorrect username"
        elif not check_password_hash(user["password"], password):
            error = "Incorrect password"

        if not error == None:
            flash("Invalid username or password")
            return Response("Invalid username or password", status=400)

        if error is None:
            session.clear()
            session["user_id"] = user["id"]
            return redirect(url_for('files.files'))

    return render_template("/index.html")


@bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index.index"))

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get("user_id")

    if user_id is None: 
        g.user = None
    else:
        g.user = get_db().execute(
            "SELECT * FROM user WHERE id = ?", (user_id,)
        ).fetchone()

# require authentication in other views
def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for("auth.login"))
        return view(**kwargs)
    return wrapped_view