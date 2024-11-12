# schemas.py

from pydantic import BaseModel, HttpUrl
from typing import List, Optional

class Author(BaseModel):
    authorId: str
    name: str
    url: HttpUrl

class Citation(BaseModel):
    arxivId: Optional[str]
    authors: List[Author]
    doi: Optional[str]
    intent: List[str]
    isInfluential: bool
    paperId: str
    title: str
    url: HttpUrl
    venue: Optional[str]
    year: int

class Reference(BaseModel):
    arxivId: Optional[str]
    authors: List[Author]
    doi: Optional[str]
    intent: List[str]
    isInfluential: bool
    paperId: str
    title: str
    url: HttpUrl
    venue: Optional[str]
    year: int

class PaperResponse(BaseModel):
    abstract: str
    arxivId: Optional[str]
    authors: List[Author]
    citationVelocity: int
    citations: List[Citation]
    corpusId: int
    doi: str
    fieldsOfStudy: List[str]
    influentialCitationCount: int
    isOpenAccess: bool
    isPublisherLicensed: bool
    numCitedBy: int
    numCiting: int
    paperId: str
    references: List[Reference]
    s2FieldsOfStudy: List[dict]
    title: str
    topics: List[str]
    url: HttpUrl
    venue: str
    year: int
