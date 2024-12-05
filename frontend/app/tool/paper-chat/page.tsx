import { SinglePaperChatStateProvider } from '@/context/viewerContext';
import MainViewer from "@/components/tool-comp/paper-chat-comp/mainViewer"

export default function Page() {
  return (
    <SinglePaperChatStateProvider>
      <div className='bg-gray-200'>
        <MainViewer />  
      </div>
    </SinglePaperChatStateProvider>
  )

}