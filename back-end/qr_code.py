import qrcode,random
from io import BytesIO

def generate_qr_code(data):
    random_number1 = random.randint(10, 99)
    random_number2= random.randint(10,99)
    data1=f"{random_number2}{data}{random_number1}"
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data1)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    byte_io = BytesIO()
    img.save(byte_io, format='PNG')
    byte_io.seek(0)
    return byte_io.getvalue()

print("QR code generated successfully!")
