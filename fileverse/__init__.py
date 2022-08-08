import os
from flask import Flask

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    # testing large file upload folder
    # UPLOAD_FOLDER="/mnt/298aaee5-6d4e-40aa-9c8e-b211d2c2d5c6"


    app.config.from_mapping(
        SECRET_KEY = "dev",
        DATABASE=os.path.join(app.instance_path, 'fileverse.sqlite'),
        UPLOAD_FOLDER=os.path.join(app.instance_path, "upload"),
        #UPLOAD_FOLDER="/mnt/storage",
        ZIP_FOLDER=os.path.join(app.instance_path, "zips"),
        MAX_CONTENT_LENGTH = 100 * 1024 * 1024 * 1024

    )


    try:
        os.makedirs(app.config["ZIP_FOLDER"])
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




    return app

