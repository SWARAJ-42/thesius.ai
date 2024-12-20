from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel
from api.repository.search_engine.main import get_query_result
from api.repository.search_engine.schema import *
from api.deps import user_dependency

from api.repository.abstract_rag.utils.markdown_generator import organize_papers_to_markdown
from api.repository.abstract_rag.utils.markdown_splitter import split_markdown_by_headers
from api.repository.abstract_rag.utils.conv_rag_paper_data import convert_paper_data_to_dict
from api.repository.abstract_rag.utils.vectorstore_operations import upload_to_pinecone_vectorstore, delete_namespace_from_index

# Do all the RAG setup
from api.repository.abstract_rag import rag_setup
from api.repository.abstract_rag.utils.Chatbot import MultiTenantRetrievalChainManager

CHAIN_MANAGER = MultiTenantRetrievalChainManager()


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

@router.post("/send-rag-data")
async def send_rag_data_endpoint(data: RagDataProps, user: user_dependency):
    try:
        # Log the received data or handle as needed
        # print(f"User {user['username']} sent data: {data.renderedPapers}")
        # print(data.renderedPapers)
        converted_papers = convert_paper_data_to_dict(data.renderedPapers)
        # print(converted_papers)
        markdown_document = organize_papers_to_markdown(converted_papers)
        md_header_splits = split_markdown_by_headers(markdown_document)
        docsearch = upload_to_pinecone_vectorstore(documents=md_header_splits, index_name=rag_setup.index_name, embeddings=rag_setup.embeddings, namespace=f"{user['id']}")
        CHAIN_MANAGER.get_or_create_chain(user_id=f"{user['id']}", docsearch=docsearch, create_new_chain=True)

        return {"message": "Data received successfully"}

    except Exception as e:
        # Handle any errors that may occur during the process
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/multiabstract-chat/query")
async def ask_question_about_selected_papers(query: QueryModel, user: user_dependency):
    try:
        print(query.query)
        retriever = CHAIN_MANAGER.user_chains[f"{user['id']}"]
        answer = retriever.invoke({"input": "what is RAG ? and give relevant sources of your answers, just the paper title"})
        return {"rag_response": answer['answer']}
    except Exception as e:
        # Handle any errors that may occur during the process
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/multiabstract-chat/delete-session")
async def delete_chat_session(user: user_dependency):
    try:
        CHAIN_MANAGER.delete_user_chain(f"{user['id']}")
        delete_namespace_from_index(index_name=rag_setup.index_name, namespace=f"{user['id']}")
        return {"message": "Chat session closed"}
    except Exception as e:
        # Handle any errors that may occur during the process
        raise HTTPException(status_code=500, detail=str(e))