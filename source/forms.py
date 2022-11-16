from flask_wtf import FlaskForm

from wtforms import StringField
from wtforms import SubmitField
from wtforms import PasswordField
from wtforms import IntegerField

from wtforms.validators import InputRequired
from wtforms.validators import Length
from wtforms.validators import EqualTo
from wtforms.validators import ValidationError
from wtforms.validators import DataRequired

from source.models import *

class usernameForm(FlaskForm) :
    """
    Username Form
    -----------------
    Formulary used to save the username of the person that plays
    if she doesn't have an account.
    """
    username = StringField('Pseudo', validators = [InputRequired(message = "Entrez le pseudo que vous desirez")])

    assert username != ""

    submit = SubmitField('Valider')

    def validateUsername(self, field) :
        """
        Function that check if the username is available.
        Exeption :
        -----------
        Raise a validation error if the username is already token.
        """
        if field.data in [x.username for x in Player.query.all()] :
            raise ValidationError('Ce pseudo est deja pris')
        

class RegisterForm(FlaskForm) :
    """
    Register Form
    ----------------
    Formulary that the user will have to submit when registering.
    """
    firstName = StringField('Prenom', validators = [InputRequired(message = "Entrez votre prenom")])
    lastName = StringField('Nom', validators = [InputRequired(message = "Entrez votre nom")])
    email = StringField('Email', validators = [InputRequired(message = "Entrez votre email")])
    username = StringField('Pseudo', validators = [InputRequired(message = "Entrez le pseudo que vous desirez")])
    password = PasswordField('Mot de passe', validators = [InputRequired(message = "Entrez un mot de passe"), Length(min = 5, message = "Votre mot de passe doit faire minimum 5 caracteres")])
    confirmPassword = PasswordField('Confirmation mot de passe', validators = [InputRequired(message = "Veuillez confirmer votre mot de passe"), Length(min = 5), EqualTo('password', message = "Huh, ceci n'etait pas votre mot de passe..")])

    assert firstName != ""
    assert lastName != ""
    assert email != ""
    assert username != ""

    submit = SubmitField('Creer mon compte')

    def validateUsername(self, field) :
        """
        Function that check if the username is available.
        Exeption :
        -----------
        Raise a validation error if the username is already token.
        """
        if field.data in [x.username for x in Player.query.all()] :
            raise ValidationError('Ce pseudo est deja pris')


class LoginForm(FlaskForm) :
    """
    Login Form 
    --------------
    Formulary that needs to be submitted when the user wants to login.
    """
    username = StringField('Pseudo', validators = [InputRequired(message = "Entrez votre pseudo")])
    password = PasswordField('Mot de passe', validators = [InputRequired(message = "Entrez votre mot de passe")])

    submit = SubmitField('Se connecter')

    def validateUsername(self, field):
        """
        Function that check if the username given exists in the db.
        Exeption : 
        -----------
        Raise a validation error if the given username does not exist at all.
        """
        if field.data not in [x.username for x in Player.query.all()] :
            raise ValidationError('Votre pseudo n existe pas')


class UpdateProfileForm(FlaskForm) :
    """
    UpdateProfile Form
    -----------------
    Asks the user different informations about him in order to update his profile.
    """
    firstName = StringField('Prenom', validators = [DataRequired(message = "Entrez votre nouveau prenom ici")])
    lastName = StringField('Nom', validators = [DataRequired(message = "Entrez votre nouveau nom ici")])
    email = StringField('Email', validators = [DataRequired(message = "Entrez votre nouvel email ici")])

    assert firstName != ""
    assert lastName != ""
    assert email != ""

    submit = SubmitField('Mettre a jour')


class UpdatePasswordForm(FlaskForm) :
    """
    UpdatePassword Form
    -----------------
    Asks the user different informations about him in order to update his password.
    """
    password = PasswordField('Mot de passe', validators = [DataRequired(message = "Choisissez un nouveau mot de passe."), Length(min = 5, message = "Votre mot de passe doit faire minimum 5 caracteres")])
    confirmPassword = PasswordField('Confirmation du mot de passe', validators = [DataRequired(message = "Confirmez votre mot de passe"), EqualTo('password', message = "Ce n'est pas le mot de passe que vous venez de mettre")])

    submit = SubmitField('Mettre a jour')