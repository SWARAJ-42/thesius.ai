from redis.commands.json.path import Path
from redis import Redis

# Initialize Redis connection
redis_instance = Redis(host="localhost", port=6379, decode_responses=True)


def store_json(key: str, json_data: dict):
    redis_instance.json().set(key, Path.root_path(), json_data)
    return {"message": f"JSON data stored at key '{key}'"}


def fetch_json(key: str):
    data = redis_instance.json().get(key)
    return {"key": key, "data": data}