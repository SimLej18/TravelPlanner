from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
import os

# Creates flask_app and set config preferences
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = "b901efb901efb901efb901efb901efb901efb901efb901ef"
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'to-do-list.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

flask_app = Flask(__name__)
flask_app.config.from_object(Config)

login_manager = LoginManager(flask_app)
login_manager.login_view = "login"
login_manager.login_message_category = "warning"
login_manager.login_message = "You cannot acces to this page. Please log in."
login_manager.session_protection = 'strong'

# Database part :
db = SQLAlchemy(flask_app)

from source import code
from source import models

# Socket parts :
socketio = SocketIO(flask_app)
