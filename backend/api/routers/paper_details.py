from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from typing import List
import httpx
from api.routers.schemas.paper_details import PaperResponse
from api.repository.scrapeRelated.scrape_related_pdfs import search_bing_for_pdf
from api.deps import user_dependency

SEMANTIC_SCHOLAR_API_URL = "https://api.semanticscholar.org/v1/paper"

router = APIRouter(
    prefix='/paper-details',
    tags=['paper-details']
)

@router.get("/{paper_id}", response_description="Paper details")
async def get_paper_details(paper_id: str, user: user_dependency):
    url = f"{SEMANTIC_SCHOLAR_API_URL}/{paper_id}?fields=title,url"
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            paper_details = response.json()
            # print(paper_details["abstract"])
            return paper_details

    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Paper not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while fetching the paper details")
    
@router.get("/related-pdfs/{query}", response_description="Paper details")
async def get_related_pdf_links(query: str, user: user_dependency):
    try:
        results = await search_bing_for_pdf(query)
        return {"results": results}
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="No results from web")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while searching for pdfs")
