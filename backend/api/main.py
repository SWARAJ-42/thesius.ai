from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers import auth, search_engine, paper_details, contact
from api.database import Base, engine
from dotenv import load_dotenv
import os
from redis import Redis
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from contextlib import asynccontextmanager

load_dotenv()

# Initialize Redis connection
redis_instance = Redis(host="localhost", port=6379, decode_responses=True)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    FastAPICache.init(RedisBackend(redis_instance), prefix="fastapi-cache")
    yield
    # Shutdown logic (if needed)
    redis_instance.close()

app = FastAPI(lifespan=lifespan)

Base.metadata.create_all(bind=engine)

allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
# print(allowed_origins)

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