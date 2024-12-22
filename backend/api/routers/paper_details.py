from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from typing import List
import httpx
from api.routers.schemas.paper_details import PaperResponse
from api.repository.scrapeRelated.scrape_related_pdfs import search_bing_for_pdf
from api.deps import user_dependency
from api.repository.redis_operations import redis_operations

SEMANTIC_SCHOLAR_API_URL = "https://api.semanticscholar.org/v1/paper"

router = APIRouter(
    prefix='/paper-details',
    tags=['paper-details']
)

@router.get("/{paper_id}", response_description="Paper details")
async def get_paper_details(paper_id: str, user: user_dependency):
    url = f"{SEMANTIC_SCHOLAR_API_URL}/{paper_id}?fields=title,url"

    # get cache
    result = redis_operations.fetch_json(key=f"paper_details:{user['id']}")

    if result:
        if paper_id == result["data"]["paperId"]:
            print("cache is already present")
            return result["data"]
    
    try:
        print("cache is absent")
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            paper_details = response.json()

            # store in cache
            redis_operations.store_json(key=f"paper_details:{user['id']}", json_data=paper_details)

            return paper_details

    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Paper not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while fetching the paper details")
    
@router.get("/related-pdfs/{query}", response_description="Paper details")
async def get_related_pdf_links(query: str, user: user_dependency):
    cache_data = redis_operations.fetch_json(key=f"web_results:{user['id']}")

    if cache_data["data"]:
        if cache_data["data"]["query"] == query:
            # print("returning cached web_results")
            return {"results": cache_data["data"]["web_results"]}

    try:
        web_results = await search_bing_for_pdf(query)

        cache_parcel = {"query": query,"web_results": web_results}
        # store in cache
        redis_operations.store_json(key=f"web_results:{user['id']}", json_data=cache_parcel)

        return {"results": web_results}
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="No results from web")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while searching for pdfs")
