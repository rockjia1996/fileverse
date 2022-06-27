import os
from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY = "dev",
        DATABASE=os.path.join(app.instance_path, 'fileverse.sqlite'),
        UPLOAD_FOLDER=os.path.join(app.instance_path, "upload"),
        MAX_CONTENT_LENGTH = 1 * 1000 * 1000
    )


    try:
        os.makedirs(app.config["UPLOAD_FOLDER"])
        os.makedirs(app.instance_path)
    except OSError:
        pass


    # blueprints go here
    from . import db
    db.init_app(app)    

    from .import auth
    app.register_blueprint(auth.bp)

    from . import files
    app.register_blueprint(files.bp)

    from . import index
    app.register_blueprint(index.bp)

    from . import mannual
    app.register_blueprint(mannual.bp)


    return app

