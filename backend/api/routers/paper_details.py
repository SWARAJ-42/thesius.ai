from fastapi import FastAPI, HTTPException, APIRouter
import httpx

router = APIRouter(
    prefix='/paper',
    tags=['paper']
)

SEMANTIC_SCHOLAR_API_URL = "https://api.semanticscholar.org/v1/paper"

@router.get("/{paper_id}",response_description="Paper details")
async def get_paper_details(paper_id: str):
    
    url = f"{SEMANTIC_SCHOLAR_API_URL}/{paper_id}"
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            paper_details = response.json()
        return paper_details

    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Paper not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while fetching the paper details")