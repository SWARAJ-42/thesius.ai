"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { Send, Trash2 } from "lucide-react";
import { RenderedPapersProp } from "./DiveDeeper";
import { useChat } from "ai/react";
import { BsSend } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { PaperCardProps } from "../../common-comp/paper-card";
import { PaperData } from "@/lib/tools/searchengine/fetchresponse";

export default function MultiAbstractChatModal({
  renderedPapers,
}: RenderedPapersProp) {
  const { messages, input, stop, isLoading, setMessages, handleInputChange, handleSubmit } =
    useChat();
  const router = useRouter();

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleCardClick = (paper: PaperData) => {
    const parcel: PaperCardProps = {
      paper: paper,
      query: paper.title,
      query_answer: "",
    };
    const paperData = encodeURIComponent(JSON.stringify(parcel)); // Encode the paper data
    router.push(`/paperdetails/${paper.paperId}?paperData=${paperData}`); // Navigate with query parameter
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={renderedPapers.length == 0}>
          Chat with the selected results
        </Button>
      </DialogTrigger>
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
                    {message.content}
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
      </DialogContent>
    </Dialog>
  );
}