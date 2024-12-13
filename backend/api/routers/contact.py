from fastapi import FastAPI, Form, HTTPException, BackgroundTasks, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER", "")
SMTP_PORT = os.getenv("SMTP_PORT", "")
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS", "")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "").encode("ascii", "ignore").decode("ascii").strip()

# Pydantic model for form data
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

router = APIRouter(
    prefix='/contact',
    tags=['contact']
)

# Function to send email asynchronously
def send_email_async(name: str, email: str, message: str):
    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = EMAIL_ADDRESS
        msg["Subject"] = f"New Contact Form Submission from {name}"

        body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, msg.as_string())
    except Exception as e:
        print(f"Error sending email: {e}")

@router.post("/submit")
async def submit_contact_form(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    email: EmailStr = Form(...),
    message: str = Form(...),
):
    print(name)
    if not name or not email or not message:
        raise HTTPException(status_code=400, detail="All fields are required.")

    # Log the submission (optional)
    print(f"New submission: {name}, {email}, {message}")

    # Send the email in the background
    background_tasks.add_task(send_email_async, name, email, message)

    return {"success": True, "message": "Your message has been sent successfully!"}
