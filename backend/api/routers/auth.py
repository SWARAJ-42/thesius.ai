from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, Response
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from jose import jwt
from dotenv import load_dotenv
import os
from api.models import User
from api.deps import db_dependency, bcrypt_context, user_dependency
from api.repository.search_engine.main import get_query_result
from api.repository.email_verification.email_verification import *

load_dotenv()

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

class UserCreateRequest(BaseModel):
    username: str
    fullname: str
    email: str
    password: str
    
class Token(BaseModel):
    auth_token: str
    token_type: str
    
    
def authenticate_user(email: str, password: str, db):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        print("user doesnot exist")
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        print("password incorrect")
        return False
    return user

def create_access_token(email: str, user_id: int, expires_delta: timedelta):
    encode = {'sub': email, 'id': user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user_request: UserCreateRequest):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == create_user_request.email).first()
    
    if existing_user:
        # Generate token and send email
        token = generate_token(existing_user.email)
        await send_verification_email(existing_user.email, token)

        return {
            "message": "Email already exists. A verification link has been resent to your email.",
            "status_code": status.HTTP_200_OK
        }

    # Create new user if email doesn't exist
    create_user_model = User(
        username=create_user_request.username,
        fullname=create_user_request.fullname,
        email=create_user_request.email,
        hashed_password=bcrypt_context.hash(create_user_request.password)
    )
    db.add(create_user_model)
    db.commit()

    # Generate token and send email
    token = generate_token(create_user_request.email)
    await send_verification_email(create_user_request.email, token)

    return {
        "message": "Registration successful. Please check your email for a verification link.",
        "status_code": status.HTTP_201_CREATED
    }

@router.get("/verify-email")
async def verify_email(token: str, db: db_dependency):
    frontend_domain = "http://localhost:3000"
    if os.getenv("NEXTJS_ENV") == "production":
        frontend_domain = os.getenv("FRONTEND_SERVER")

    try:
        # Decode token and fetch user
        email = serializer.loads(token, salt="email-verification", max_age=3600)
        user = db.query(User).filter(User.email == email).first()

        if not user:
            return {"error": "User not found."}
        
        # Update verification status
        user.is_verified = True
        db.commit()

        # Redirect to the frontend login route
        return RedirectResponse(url=f"{frontend_domain}/auth/login", status_code=303)
    except Exception as e:
        # Redirect to the error page or a fallback page
        return RedirectResponse(url=f"{frontend_domain}/auth/register", status_code=303)


    
@router.post('/token', response_model=Token)
async def login_for_access_token(response: Response, form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: db_dependency):
    print(form_data.username, form_data.password)
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user: 
        print("Could not validate user")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user")
    if not user.is_verified:
        print("verify your email to login")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="verify your email to login")
    token = create_access_token(user.username, user.id, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    response.set_cookie(key="auth_token", value=f"{token}", httponly=True, max_age=ACCESS_TOKEN_EXPIRE_MINUTES*60)
    return {'auth_token': token, 'token_type': 'bearer'}
    
@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("auth_token")
    return {"message": "Logged out"}

@router.get("/protected")
async def protected_route(db: db_dependency, current_user: user_dependency):
    user = db.query(User).filter(User.id == current_user["id"]).first()
    return { "userData" :user , "message": "Successfull authentication"}