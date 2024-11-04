import pandas as pd
import openai
import utils
import constants
from sklearn.metrics.pairwise import cosine_similarity
import nltk
nltk.download("stopwords")

openai.api_key = constants.OPENAI_API_KEY

def get_query_result(query):
    df = utils.get_papers()

    # Check if there are any relevant results
    if not df:
        return {'message': "Sorry, no result found"}
    
    df, query = utils.rerank(df, query, column_name='title_abs')
    gpt_response = utils.answer_question(df=df,question=query, debug=False)
    df_list = df.to_dict(orient='records')
    
    data = {
        'message': gpt_response,
        'relevant_papers': df_list,
        
    }