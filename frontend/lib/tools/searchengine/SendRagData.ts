// TypeScript File: sendRequest.ts
import { BACKEND_URL } from '@/lib/constants';
import axios from 'axios';
import { PaperData } from './fetchresponse';



export interface RagDataProps {
  renderedPapers: PaperData[];
  create_new_chat_instance: boolean
}

// Function to send POST request
export const sendRenderedPapers = async (data: RagDataProps): Promise<void> => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/searchpapers/send-rag-data`,
      data,
      {
        withCredentials: true,
      }
    );
    console.log('Response from FastAPI:', response.data);
  } catch (error) {
    console.error('Error sending rendered papers:', error);
  }
};
