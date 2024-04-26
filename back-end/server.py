from flask import Flask, request, jsonify
import cv2
import datetime
from pyzbar.pyzbar import decode
import mysql.connector
from flask_jwt_extended import JWTManager,create_access_token,jwt_required,get_jwt_identity
from models.model import db,User,leave
from flask_cors import CORS
from datetime import timedelta
from mail import mail

host = '127.0.0.1'
user = 'root'
password = 'root'
database = 'demo'

def con():
    try:
        connection = mysql.connector.connect(host=host, user=user, password=password, database=database)
        return connection
    except mysql.connector.Error as e:
        print("Error connecting to database:", e)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['JWT_SECRET_KEY'] = '1234okmnbvc'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@127.0.0.1/demo'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
jwt = JWTManager(app)

@app.route('/take-attendance', methods=['GET'])
@jwt_required()
def take_attendance():
    cap = cv2.VideoCapture(0)
    while True:
        ret, frame = cap.read()
        qr_data, punch_time = read_qr_code(frame)
        if qr_data:
            break
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()
    return jsonify({'qr_data': qr_data, 'punch_time': punch_time})

def read_qr_code(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    decoded_objects = decode(gray)
    for obj in decoded_objects:
        data = obj.data.decode('utf-8')
        time_now = datetime.datetime.now()
        print("QR Code Data:", data)
        print("Punch Time:", time_now)
        insert_or_update_punch_data(data,time_now)
        return data, time_now
    return None, None

def insert_or_update_punch_data(empcode, punch_time):
    try:
        connection=con()
        cursor = connection.cursor()
        cursor.execute("SELECT emp_id, intime FROM emp WHERE empcode = %s AND DATE(_date_) = %s", (empcode, punch_time.date()))
        existing_punch = cursor.fetchone()

        if existing_punch:
            emp_id, intime = existing_punch
            if intime:
                cursor.execute("UPDATE emp SET outtime = %s, tot = TIMESTAMPDIFF(SECOND, intime, %s) WHERE emp_id = %s",
                               (punch_time, punch_time, emp_id))
            else:
                cursor.execute("UPDATE emp SET intime = %s WHERE emp_id = %s", (punch_time, emp_id))
        else:
            cursor.execute("INSERT INTO emp (empcode, _date_, intime) VALUES (%s, %s, %s)",
                           (empcode, punch_time, punch_time))
        connection.commit()
        print("Punch data inserted/updated successfully.")
        
    except mysql.connector.Error as e:
        print("Error inserting/updating punch data:", e)
    finally:
        if connection:
            connection.close()
            print("Database connection closed.")


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('employeeID')
    password = data.get('password')
    role=data.get('role')
    expires = timedelta(hours=1)
    user = User.query.filter_by(username=username, password=password, role=role).first()
    if not user:
        return jsonify({'status':False,'message': 'Invalid username or password'}), 401

    access_token = create_access_token(identity=user.username, expires_delta=expires)
    return jsonify({'status':True,'access_token':access_token}), 200


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route('/getuser',methods=['GET'])
@jwt_required()
def val():
    return "Hari"

@app.route('/leavereq',methods=['GET'])
@jwt_required()
def get():
    results=leave.query.filter_by(deleted=False)
    leave_requests = [{'id':result.id,'empid': result.empid, 'noofdays': result.noofdays, 'status': result.status,'Reason':result.reason} for result in results]
    return jsonify(leave_requests)

@app.route('/approve/<int:id>',methods=['PUT'])
@jwt_required()
def approve(id):
    if request.method == 'PUT':
        data = request.json
        leave_request = leave.query.get(id)
        if not leave_request:
            return jsonify({"message": "Leave request not found."}), 404

        status = data.get('status')
        if status is None:
            return jsonify({"message": "Status is missing in the request."}), 400

        if status:  # If status is True (approve)
            leave_request.status = True
        else:
            leave_request.status = False

        leave_request.deleted = True
        db.session.commit()

        if status:
            return jsonify({"message": "Leave request approved successfully."}), 200
        else:
            return jsonify({"message": "Leave request rejected successfully."}), 200
    else:
        return jsonify({"message": "Method not allowed."}), 405

@app.route('/onboard',methods=['POST'])
@jwt_required()
def onboard():
    if request.method == 'POST':
        data=request.json
        name=data.get('username')
        passwrd=data.get('password')
        email=data.get('email')
        new_emp=User(username=name,password=passwrd,role='emp')
        try:
            db.session.add(new_emp)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
        mail(name,passwrd,email)
    return "Successfully employee Added"

@app.route('/applyleave',methods=['POST'])
@jwt_required()
def apply():
    if request.method == 'POST':
        data=request.json
        print(data)
        reason = data.get('reason')
        empid = get_jwt_identity()
        no_of_days = int(data.get('noOfDays'))
        new_leave_request = leave(reason=reason, empid=empid, noofdays=no_of_days, status=False)
        try:
            db.session.add(new_leave_request)
            db.session.commit()
            return 'Leave request submitted successfully'
        except Exception as e:
            db.session.rollback()
            return f'Error submitting leave request: {str(e)}'

    return 'Invalid request method'

if __name__ == '__main__':
    app.run(debug=True)
