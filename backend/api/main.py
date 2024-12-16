from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import auth, search_engine, paper_details, contact
from api.database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://<YOUR_CUSTOM_DNS>",
        "http://<YOUR_CUSTOM_IP>"
    ],  # Add custom DNS and IP
    allow_credentials=True,
    allow_methods=["*"],  # Restrict if needed
    allow_headers=["*"],  # Restrict if needed
)

@app.get("/")
def health_check():
    return 'Health check complete'

app.include_router(auth.router)
app.include_router(search_engine.router)
app.include_router(paper_details.router)
app.include_router(contact.router)