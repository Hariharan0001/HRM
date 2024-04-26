import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from qr_code import generate_qr_code
def send_email(sender_email, sender_password, recipient_email, subject, body,qr_code_data):
    smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    smtp_server.ehlo()
    smtp_server.login(sender_email, sender_password)
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    if qr_code_data:
        qr_code_mime = MIMEImage(qr_code_data)
        qr_code_mime.add_header('Content-Disposition', 'attachment', filename='qrcode.png')
        msg.attach(qr_code_mime)
    smtp_server.send_message(msg)
    smtp_server.quit()


def mail(username,password,rec_mail):
    sender_email = 'hsjb1055@gmail.com'
    sender_password = 'lsop vamx dkza czwk'
    recipient_email = rec_mail
    subject = 'Employee OnBoard Email'
    body = f'Hi Dear, your username for HRM is {username} and the password is {password}.The below QR code is for Employee Attendence Purpose.'
    qrcode=generate_qr_code(username)
    send_email(sender_email, sender_password, recipient_email, subject, body,qrcode)

print("Email sent successfully!")
