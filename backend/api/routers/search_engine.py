from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from api.repository.search_engine.main import get_query_result
from api.deps import user_dependency

router = APIRouter(
    prefix='/searchpapers',
    tags=['search_features']
)

class QueryModel(BaseModel):
    query: str

@router.post("/get-results")
async def get_query_result_endpoint(query: QueryModel, user: user_dependency):
    try:
        # Call the function and pass the query from the request body
        result = get_query_result(query.query)
        return result  # Returns the response in JSON format

    except Exception as e:
        # Handle any errors that may occur during the process
        raise HTTPException(status_code=500, detail=str(e))