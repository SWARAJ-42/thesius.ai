from pydantic import BaseModel
from typing import List, Optional

# Define Pydantic models for OpenAccessPdf and Tldr
class OpenAccessPdf(BaseModel):
    url: str
    status: str

class Tldr(BaseModel):
    model: str
    text: str

# Updated PaperData model
class PaperData(BaseModel):
    paperId: str
    title: str
    abstract: str
    venue: str
    year: str
    citationCount: int
    influentialCitationCount: int
    isOpenAccess: bool
    openAccessPdf: Optional[OpenAccessPdf]  # Nullable field
    fieldsOfStudy: List[str]
    tldr: Optional[Tldr]  # Nullable field
    similarity: float

# Updated RagDataProps model
class RagDataProps(BaseModel):
    renderedPapers: List[PaperData]
    create_new_chat_instance: bool

