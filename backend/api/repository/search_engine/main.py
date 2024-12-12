import sys
import os

# Adjust the path to point to the project root
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

import openai
import pandas as pd
import api.repository.search_engine.utils as utils
import api.repository.search_engine.constants as constants
import api.repository.search_engine.test_data as test_data
import nltk
nltk.download("stopwords")

openai.api_key = constants.OPENAI_API_KEY

from fastapi.encoders import jsonable_encoder

def get_query_result(query):
    df = pd.DataFrame(test_data.dummy_papers)

    '''temporarily commented for testing'''
    # df = utils.get_papers(query)

    # if df is None:
    #     return {'data': jsonable_encoder([{}]), 'final_answer': "Sorry, no result found"}
    
    df, query = utils.rerank(df, query, column_name='title_abs')
    gpt_response = utils.answer_question(df=df, question=query, debug=False)

    # alternate for testing
    # gpt_response = {"gpt_answer": "This is a sample output for testing", "followup_questions":["followup one", "followup two", "followup three"]}

    df = df.drop(columns=['title_abs', 'n_tokens', 'specter_embeddings'])
    
    # Ensure data is JSON serializable
    df_list = df.astype(str).to_dict(orient='records')

    response = {
        'data': jsonable_encoder([dict(record) for record in df_list]),
        'final_answer': str(gpt_response["gpt_answer"]),
        'followup_questions': jsonable_encoder(gpt_response["followup_questions"])
    }
    
    print(response["final_answer"])
    print(response["followup_questions"])

    return response

# print(get_query_result(query="what is a retrieval augmented generation ?"))