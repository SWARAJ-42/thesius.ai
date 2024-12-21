from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import auth, search_engine, paper_details, contact
from api.database import Base, engine
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

Base.metadata.create_all(bind=engine)

allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
print(allowed_origins)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return 'Health check complete'

app.include_router(auth.router)
app.include_router(search_engine.router)
app.include_router(paper_details.router)
app.include_router(contact.router)