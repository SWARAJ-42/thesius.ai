"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { LoaderIcon, Send, Trash2, X } from "lucide-react";
import { Loader2 } from "lucide-react"; // Import the loading icon
import { RenderedPapersProp } from "./DiveDeeper";
import { useChat } from "ai/react";
import { BsSend } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { PaperCardProps } from "../../common-comp/paper-card";
import { PaperData } from "@/lib/tools/searchengine/fetchresponse";
import {
  askQuestionAboutSelectedPapers,
  deleteChatSession,
  sendRenderedPapers,
} from "@/lib/tools/searchengine/SendRagData";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css"; // Import Katex CSS
import "./styles.css"

type Message = {
  role: "user" | "bot";
  content: string;
};

export default function MultiAbstractChatModal({
  renderedPapers,
}: RenderedPapersProp) {
  const { stop, isLoading } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi there! How can I assist you?" },
  ]);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [chatSetupLoading, setchatsetupLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const handleCloseClick = () => {
    console.log("Dialog closed by clicking the close button");
    deleteChatSession();
    closeDialog();
  };

  const addMessage = (role: "user" | "bot", content: string) => {
    setMessages((prevMessages: Message[]) => [
      ...prevMessages,
      { role, content },
    ]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value); // Update the input state
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleCardClick = (paper: PaperData) => {
    const parcel: PaperCardProps = {
      paper: paper,
      query: paper.title,
      query_answer: "",
    };
    deleteChatSession();
    const paperData = encodeURIComponent(JSON.stringify(parcel)); // Encode the paper data
    router.push(`/paperdetails/${paper.paperId}?paperData=${paperData}`); // Navigate with query parameter
  };

  const handleSendRagData = async () => {
    try {
      setchatsetupLoading(true);
      await sendRenderedPapers({
        renderedPapers: renderedPapers,
        create_new_chat_instance: true,
      });
      setchatsetupLoading(false);
      openDialog();
      console.log("Data sent successfully!");
    } catch (error) {
      closeDialog();
      console.error("Failed to send data:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    if (input.trim() === "") return; // Ignore empty submissions

    // Add the user's query to the message list
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input.trim() },
    ]);

    // Clear the input field
    const query = input;
    setInput("");

    // Optionally, handle bot response logic here
    const response = await askQuestionAboutSelectedPapers({ query: query });
    if (response) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: response.rag_response },
      ]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        onClick={() => {
          handleSendRagData();
        }}
        disabled={renderedPapers.length == 0 || chatSetupLoading}
      >
        {!chatSetupLoading ? (
          "Chat with the selected results"
        ) : (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
      </Button>
      <DialogContent className="max-w-5xl w-[80vw] h-[80vh] max-h-[900px] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Multi abstract chat</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 h-full overflow-hidden p-6">
          <div className="flex flex-col w-2/3 h-full overflow-hidden">
            <ScrollArea className="flex-grow mb-4 border rounded-md p-4 overflow-y-auto h-[60vh]">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <ReactMarkdown
                      className="markdown text-sm"
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </span>
                </div>
              ))}
            </ScrollArea>
            <div className="flex flex-wrap gap-2 mb-4">
              {/* {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => {}}
                  className="text-xs"
                >
                  Q{index + 1}
                </Button>
              ))} */}
              <Button
                // variant="outline"
                onClick={handleClearChat}
                className="p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 focus:outline-none font-bold"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Chat
              </Button>
              {isLoading && (
                <Button
                  className="p-2 bg-red-300 text-black rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 font-bold"
                  type="button"
                  onClick={() => stop()}
                >
                  stop
                </Button>
              )}
            </div>
            <form
              className="border-t border-gray-200 p-4 bg-gray-200 rounded-xl"
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <div className="mb-2"></div>
              <div className="flex items-center space-x-2">
                <input
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={input}
                  placeholder="Ask anything..."
                  onChange={handleInputChange}
                />
                <button
                  type="submit"
                  className="p-2 bg-green-300 text-black rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <BsSend className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
          <ScrollArea className="w-1/3 h-full overflow-y-auto">
            <div className="pr-4">
              {renderedPapers.map((paper, index) => (
                <Card
                  key={index}
                  className="mb-4 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    handleCardClick(paper);
                  }}
                >
                  <CardHeader>
                    <CardTitle>{paper.title}</CardTitle>
                    <CardDescription className="p-1 bg-gray-100 rounded-full w-fit">
                      {paper.year}
                    </CardDescription>
                    <CardDescription>{paper.tldr?.text}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
        <DialogClose asChild>
          <Button
            size="icon"
            className="z-20 absolute right-4 top-4 rounded-md bg-gray-200 hover:bg-gray-300"
            onClick={handleCloseClick}
          >
            <X className="h-4 w-4 text-black" />
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
