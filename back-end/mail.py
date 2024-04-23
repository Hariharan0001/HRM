import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_email(sender_email, sender_password, recipient_email, subject, body):
    smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    smtp_server.ehlo()
    smtp_server.login(sender_email, sender_password)
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    smtp_server.send_message(msg)
    smtp_server.quit()
sender_email = 'hsjb1055@gmail.com'
sender_password = 'lsop vamx dkza czwk'
recipient_email = 'aravindhasamychs2017@gmail.com'
subject = 'Test Email'
body = 'hi aravind'

send_email(sender_email, sender_password, recipient_email, subject, body)
print("Email sent successfully!")
