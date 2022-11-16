from flask_login import UserMixin
from source import db
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from source import login_manager

@login_manager.user_loader
def load_user(user_id):
    return Account.get(user_id)

class Account(UserMixin, db.Model) :
    """
    Account class
    --------------
    This class will contain all the information about the users who have an account.
    """
    #Initialisation
    __tablename__ = 'account'

    #DB
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    username = db.Column(db.String(255), nullable = False, unique = True)
    lastName = db.Column(db.String(255), nullable = False)
    firstName = db.Column(db.String(255), nullable = False)
    email = db.Column(db.String(255), nullable = False, unique = True)
    password = db.Column(db.String(255), nullable = False)

    def getUsername(self) :
        """
        Getter of the username.
        Return :
        ----------
        Username
        """
        return self.id

    def setPassword(self, password) :
        """
        Setter of the password in the database.
        We use for that the function generate_password_hash so that the password is cripted in the database.
        """
        self.password = generate_password_hash(password)
        db.session.commit()

    def checkPassword(self, password) :
        """
        Check if the password do correspond.
        Return :
        ----------
        True if the passwords do correspond, False otherwise.
        """
        return check_password_hash(self.password, password)

    def __repr__(self) :
        """
        How users will be represented.
        Return :
        ----------
        Representation of a user.
        """
        return "<User id : %d, username : %s, lastName : %s, firstName : %s, email : %s>" % (self.id, self.username, self.lastName, self.firstName, self.email)

"""
#The DB part :
db.drop_all()
db.create_all()

#Hardcode of my user in the DB (just for convenience)
utilisateur = Account(username = "willemab", lastName = "Willemart", firstName = "Blandine", email = "blandine.willemart@student.unamur.be", password = "mypassword"
db.session.add(utilisateur)
db.session.commit()
"""
