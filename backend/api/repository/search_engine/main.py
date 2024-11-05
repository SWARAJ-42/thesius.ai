import pandas as pd
import openai
import api.repository.search_engine.utils as utils
import api.repository.search_engine.constants as constants
from sklearn.metrics.pairwise import cosine_similarity
import nltk
nltk.download("stopwords")

openai.api_key = constants.OPENAI_API_KEY

from fastapi.encoders import jsonable_encoder

def get_query_result(query):
    df = utils.get_papers(query)

    if df is None:
        return {'message': "Sorry, no result found"}
    
    df, query = utils.rerank(df, query, column_name='title_abs')
    gpt_response = utils.answer_question(df=df, question=query, debug=False)
    
    # Ensure data is JSON serializable
    df_list = df.astype(str).to_dict(orient='records')
    response = {
        'data': jsonable_encoder([dict(record) for record in df_list]),
        'final_answer': str(gpt_response)  
    }
    
    return response




# get_query_result("what is Retrieval-Augmented Generation")