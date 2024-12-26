# schemas.py

from pydantic import BaseModel, HttpUrl
from typing import List, Optional

# FastAPI Schema
from pydantic import BaseModel, HttpUrl
from typing import List, Optional

class CitationNormalizedPercentile(BaseModel):
    value: float
    is_in_top_1_percent: bool
    is_in_top_10_percent: bool

class OpenAccessPdf(BaseModel):
    url: Optional[HttpUrl]
    status: str

class Author(BaseModel):
    authorId: str
    name: str
    url: HttpUrl

class FieldOfStudy(BaseModel):
    name: str

class Paper(BaseModel):
    paperId: str
    url: HttpUrl
    title: str
    abstract: Optional[str]
    venue: Optional[str]
    year: int
    referenceCount: int
    citationCount: int
    citation_normalized_percentile: CitationNormalizedPercentile
    isOpenAccess: bool
    openAccessPdf: OpenAccessPdf
    fieldsOfStudy: List[str]
    tldr: Optional[str]

class PaperResponse(Paper):
    authors: List[Author]
    citations: List[Paper]
    references: List[Paper]
