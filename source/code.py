from source import flask_app
from source import db

from flask import render_template, redirect
from flask import url_for, request
from flask import flash

from werkzeug.exceptions import abort

from flask_login import login_required, current_user,login_user, logout_user

from source.forms import *
from source.models import *
from werkzeug.security import check_password_hash

def standard_error(error, customRedirect=False, redirectLink='', redirectMessage=''):
	"""
	Utilisé pour afficher des informations à l'utilisateur lorsque quelque chose ne va pas
	"""
	return render_template(
		'errorPage.html',
		error=error,
		customRedirect=customRedirect,
		redirectLink=redirectLink,
		redirectMessage=redirectMessage)


@flask_app.errorhandler(401)
def page_not_found(e):
	"""
	Utilisé pour les demandes provenant d'utilisateurs non authentifiés
	"""
	return render_template('status/401.html'), 401


@flask_app.errorhandler(403)
def page_not_found(e):
	"""
	Utilisé pour les requêtes qui demandent un contenu interdit à cet utilisateur
	"""
	return render_template('status/403.html'), 403


@flask_app.errorhandler(404)
def page_not_found(e):
	"""
	Utilisé pour les requêtes qui demandent quelque chose qui ne peut pas être trouvé
	"""
	return render_template('status/404.html'), 404

@flask_app.route("/")
def render():
    return render_template('index.html')

@flask_app.route("/login", methods=["GET", "POST"])
def login():
    """
    Login function.
    Redirection to the login page.
    Exceptions :
    ----------------
    User already connected to his account.
    Username does not exist.
    The password is not correct.
    """
    if current_user.is_authenticated :
        flash("Vous êtes déjà connecté à votre compte", "warning")
        return redirect(url_for('homepage'))

    form = LoginForm()
    #Verification of the form
    if form.validate_on_submit():
        #Let's "init" the user
        user = Account.query.filter_by(username = form.username.data).first()
        #Verification of the user password.
        if user is not None and check_password_hash(user.password, form.password.data):
            login_user(user)
            return redirect(url_for('homepage'))
        #Password or username might be wrong
        else :
            flash("Votre mot de passe ou votre pseudo est incorrect", "warning")
            return redirect(url_for('login'))
    return render_template('login.html',form = form)


@flask_app.route("/register", methods=["GET", "POST"])
def register() :
    """
    Registration function. If the user is already logged, then we'll go back to the home page.
    Redirection to the registration page.
    Exception :
    --------------
    User already logged in.
    """
    if current_user.is_authenticated :
        #User is logged
        flash("Vous êtes déjà connecté à votre compte.", "info")
        return redirect(url_for("homepage"))

    form = RegisterForm()
    if form.validate_on_submit():
        #Add the user
        new = Account(username = form.username.data, lastName = form.lastName.data, firstName = form.firstName.data, email = form.email.data, password = generate_password_hash(form.password.data))
        db.session.add(new)
        db.session.commit()
        login_user(new)
        return redirect(url_for("homepage"))

    return render_template('register.html', form = form)


@flask_app.route("/logout")
def logout():
    """
    Logout of the user. The user will go back to the home page.
    Redirection to the main page.
    """
    if current_user.is_authenticated :
        logout_user()
    return redirect(url_for("homepage"))


@flask_app.route("/profile")
@login_required
def profile() :
    """
    This will show the informations about the user's profile.
    Redirection to the profile page.
    """
    if current_user.is_authenticated :
        return render_template('profile.html')


@flask_app.route("/deleteProfile")
@login_required
def deleteProfile() :
    """
    Possibility for the user to delete his profile.
    """
    db.session.delete(current_user)
    db.session.commit()
    logout()
    return redirect(url_for("homepage"))


@flask_app.route("/editProfile", methods=["GET", "POST"])
@login_required
def editProfile() :
    """
    This will allow the user to edit his profile's information.
    """
    form = UpdateProfileForm()

    if form.validate_on_submit():
        current_user.lastName = form.lastName.data
        current_user.firstName = form.firstName.data
        current_user.email = form.email.data

        db.session.commit()
        return redirect(url_for('profile'))

    else :
        form.lastName.data = current_user.lastName
        form.firstName.data = current_user.firstName
        form.email.data = current_user.email

        return render_template('account.html', form = form)


@flask_app.route("/editMDP", methods=["GET", "POST"])
@login_required
def editMDP():
    """
    Allows the user to change his password.
    """
    form = UpdatePasswordForm()

    if form.validate_on_submit():
        current_user.set_pwd(form.password.data)
        db.session.commit()
        return redirect(url_for("profile"))
    else:
        return render_template("password.html", form=form)
