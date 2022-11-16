from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from config import Config

def initDB():
    """
    Initialisation of the database.
    """
    db.create_all()

    db.session.commit()

app = Flask(__name__)
app.config.from_object(Config)

login_manager = LoginManager(app)
login_manager.login_view = "login"
login_manager.login_message_category = "warning"
login_manager.login_message = "You cannot acces to this page. Please log in."
login_manager.session_protection = 'strong'

# Database part :
db = SQLAlchemy(app)

# Socket parts :
socketio = SocketIO(app)

from source import code
from source import models

initDB()