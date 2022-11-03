
from source import app

from flask import render_template, redirect
from flask import url_for, request


@app.route("/")
def render():
    return render_template('index.html')