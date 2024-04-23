import cv2
import datetime
from pyzbar.pyzbar import decode

def read_qr_code(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    decoded_objects = decode(gray)
    for obj in decoded_objects:
        data = obj.data.decode('utf-8')
        time_now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print("QR Code Data:", data)
        print("Punch Time:", time_now)
        cap.release()
        cv2.destroyAllWindows()
        return data, time_now
    return None, None
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    cv2.imshow('frame', frame)
    qr_data, punch_time = read_qr_code(frame)
    if qr_data:
        break
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()

