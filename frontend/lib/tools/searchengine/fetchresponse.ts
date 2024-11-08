import axios from 'axios';

export interface OpenAccessPdf {
  url: string;
  status: string;
}

export const isOpenAccessPdf = (variable: any): variable is OpenAccessPdf =>
  typeof variable?.url === "string" && typeof variable?.status === "string";

export interface Tldr {
  model: string;
  text: string;
}

export const isTldr = (variable: any): variable is Tldr =>
  typeof variable?.model === "string" && typeof variable?.text === "string";

export interface PaperData {
  paperId: string;
  title: string;
  abstract: string;
  venue: string;
  year: string;
  citationCount: number;
  influentialCitationCount: number;
  isOpenAccess: boolean | string;
  openAccessPdf: OpenAccessPdf | null;
  fieldsOfStudy: string[];
  tldr: Tldr | null;
  similarity: number;
}

export interface QueryResult {
  data: PaperData[];
  final_answer: string;
}

export const fetchQueryResult = async (query: string): Promise<QueryResult | null> => {
  try {
    const response = await axios.post<QueryResult>('http://localhost:8000/searchpapers/get-results', { query });

    if (response.data) {
      const queryData: QueryResult = {
        ...response.data,
        data: response.data.data.map((paper) => ({
          paperId: paper.paperId,
          title: paper.title,
          abstract: paper.abstract,
          venue: paper.venue,
          year: paper.year,
          citationCount: Number(paper.citationCount),
          influentialCitationCount: Number(paper.influentialCitationCount),
          isOpenAccess: paper.isOpenAccess === 'True' || paper.isOpenAccess === true,
          openAccessPdf: typeof paper.openAccessPdf === 'string' ? safeJsonParseAndCheck<OpenAccessPdf>(paper.openAccessPdf, isOpenAccessPdf) : paper.openAccessPdf,
          fieldsOfStudy: Array.isArray(paper.fieldsOfStudy) ? paper.fieldsOfStudy : safeJsonParse(paper.fieldsOfStudy) ?? [],
          tldr: typeof paper.tldr === 'string' ? safeJsonParseAndCheck<Tldr>(paper.tldr, isTldr) : paper.tldr,
          similarity: Number(paper.similarity),
        })),
      };

      console.log("Parsed Query Data:", queryData);
      return queryData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching query result:", error);
    return null;
  }
};

// Enhanced helper function to safely parse Python-like JSON strings
function safeJsonParse(value: string) {
  try {
    // Replace single quotes with double quotes and handle common Python-style notations
    const jsonCompatible = value
      .replace(/'/g, '"')  // Convert single quotes to double quotes
      .replace(/True/g, 'true')  // Convert Python booleans to JavaScript booleans
      .replace(/False/g, 'false');  // Convert Python booleans to JavaScript booleans

    return JSON.parse(jsonCompatible);
  } catch (error) {
    console.warn("Failed to parse JSON:", value, error);
    return null;
  }
}

// Generic helper function for parsing and validating with type guards
function safeJsonParseAndCheck<T>(value: string, typeGuard: (variable: any) => variable is T): T | null {
  const parsedValue = safeJsonParse(value);
  return parsedValue && typeGuard(parsedValue) ? parsedValue : null;
}
