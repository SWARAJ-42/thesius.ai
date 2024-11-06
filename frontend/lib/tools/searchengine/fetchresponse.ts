import axios from 'axios';

export interface OpenAccessPdf {
  url: string;
  status: string;
}

export const isOpenAccessPdf = (variable: any): variable is OpenAccessPdf =>
  typeof variable?.url === "string" && typeof variable?.status === "string";

export interface PaperData {
  paperId: string;
  title: string;
  abstract: string;
  venue: string;
  year: string;
  citationCount: number;
  influentialCitationCount: number;
  isOpenAccess: boolean | string;
  openAccessPdf: OpenAccessPdf | string;
  fieldsOfStudy: string[] | string;
  tldr: string;
  similarity: number;
}

export interface QueryResult {
  data: PaperData[];
  final_answer: string;
}

export const fetchQueryResult = async (query: string): Promise<QueryResult | null> => {
  try {
    const response = await axios.post<QueryResult>('/api/query', { query });

    if (response.data) {
      const queryData: QueryResult = {
        ...response.data,
        data: response.data.data.map(paper => ({
          ...paper,
          // Check and parse JSON strings to objects
          openAccessPdf: typeof paper.openAccessPdf === 'string' ? JSON.parse(paper.openAccessPdf) : paper.openAccessPdf,
          fieldsOfStudy: typeof paper.fieldsOfStudy === 'string' ? JSON.parse(paper.fieldsOfStudy) : paper.fieldsOfStudy,
          tldr: typeof paper.tldr === 'string' ? JSON.parse(paper.tldr) : paper.tldr,
          isOpenAccess: paper.isOpenAccess === 'True' || paper.isOpenAccess === true,  // Ensure boolean conversion
          citationCount: Number(paper.citationCount),  // Convert to number
          influentialCitationCount: Number(paper.influentialCitationCount),  // Convert to number
          similarity: Number(paper.similarity)  // Convert to number
        }))
      };

      console.log("Parsed Query Data:", queryData);
      return queryData;  // Return the parsed result
    } else {
      return null;  // Handle the case where no data is returned
    }
  } catch (error) {
    console.error("Error fetching query result:", error);
    return null;
  }
};

// Usage example:
// fetchQueryResult("example query").then(result => console.log(result));
