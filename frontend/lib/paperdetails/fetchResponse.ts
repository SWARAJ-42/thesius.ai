import { AllRelatedPapersLinks, PaperResponse } from "./schema";

export async function fetchPaperDetails(paperId: string): Promise<PaperResponse> {
    try {
        const response = await fetch(`http://localhost:8000/paper-details/${paperId}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data: PaperResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching paper details:", error);
        throw error;
    }
}

export async function SearchRelatedPaperPdfLinks(query: string): Promise<AllRelatedPapersLinks> {
    try {
        const response = await fetch(`http://localhost:8000/paper-details/related-pdfs/${query}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data: AllRelatedPapersLinks = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching paper details:", error);
        throw error;
    }
}

// export default fetchPaperDetails

// fetchPaperDetails("5c5751d45e298cea054f32b392c12c61027d2fe7")
//     .then((data) => {
//         console.log("Fetched Paper Details:", data);
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     });
