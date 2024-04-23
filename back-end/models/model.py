from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__="roles"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(20), nullable=False)

class leave(db.Model):
    __tablename__="leavereq"
    id = db.Column(db.Integer,primary_key=True)
    reason=db.Column(db.String(50))
    empid=db.Column(db.String(50))
    noofdays=db.Column(db.Integer)
    status=db.Column(db.Boolean)

