from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask.ext.login import UserMixin, AnonymousUserMixin
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask
from flask.ext.bcrypt import Bcrypt
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

app = Flask(__name__, template_folder="static/templates")
MYSQL_USR = "myground"
MYSQL_HOST = "localhost"
MYSQL_PASS = "YpbcuGrta2"
MYSQL_DB = "myground"
MYSQL_PORT = 3306
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://{}:{}@{}:{}/{}' .format(MYSQL_USR, MYSQL_PASS, MYSQL_HOST, MYSQL_PORT, MYSQL_DB)
app.config['SQLALCHEMY_POOL_RECYCLE'] = 1600
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SECRET_KEY'] = 't5uteY2kuxethus8yaste4aP2'
db = SQLAlchemy(app)
db.init_app(app)
bcrypt = Bcrypt(app)


####################
#   Model Classes
####################

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(64))
    username = db.Column(db.String(64), unique=True)
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    address_one = db.Column(db.String(64))
    address_two = db.Column(db.String(64))
    state = db.Column(db.String(64))
    city = db.Column(db.String(64))
    zip = db.Column(db.Integer)
    cell_phone = db.Column(db.Integer)
    receive_texts = db.Column(db.Integer)
    role_id = db.Column(db.Integer)
    password_hash = db.Column(db.String(128))
    confirmed = db.Column(db.Integer, default=0)

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password, 12)

    def verify_password(self, password):
        try:
            return bcrypt.check_password_hash(self.password_hash, password)
        except:
            return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>' .format(self.first_name)

    def generate_auth_token(self, expiration=3600):
        s = Serializer(app.config['SECRET_KEY'], expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(self, token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return False
        if data.get('id') != self.id:
            return False
        self.confirmed = 1
        db.session.commit()
        return True
