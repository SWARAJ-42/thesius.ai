from api.repository.advanced_search_engine import open_alex_lib
from api.repository.advanced_search_engine import utils_continued
from api.routers.schemas import advanced_search_engine_schema
import pandas as pd


def get_papers(query, filterData: advanced_search_engine_schema.FilterData):
    try:
        extracted_topics = utils_continued.extract_topics(query)

        search_results = []
        for topic in extracted_topics:
            print(topic)
            search_results += open_alex_lib.fetch_openalex_data_advanced(topic, filterData, 10)

        # Deduplicate by unique id
        search_results = list(
            {result["id"]: result for result in search_results}.values()
        )
        
        search_results = open_alex_lib.convert_api_to_first_format(search_results)
        if len(search_results) == 0:
            print("No results found - Try another query")
        else:
            df = pd.DataFrame(search_results).dropna()
            return df
    except Exception as e:
        print(f"An error occurred while searching papers: {e}")