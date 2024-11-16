// temporary
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, Upload, File, Send } from "lucide-react";
import { ExpandableSidebar } from "@/components/tool-comp/common-comp/expandable-sidebar";

export default function ChatWithPDF() {
  const [chatMessages, setChatMessages] = useState([
    {
      role: "system",
      content:
        "Welcome to Thesius.ai Deep research ! How can I help you with these papers ?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedPDFs, setSelectedPDFs] = useState<number[]>([]);
  const [showSuggestedQuestions, setShowSuggestedQuestions] = useState(true);

  const suggestedQuestions = [
    "What are the key points of the first PDF?",
    "Can you summarize the second PDF?",
    "How do the PDFs relate to each other?",
  ];

  const pdfList = [
    { id: 1, title: "Introduction to Machine Learning", pages: 45 },
    { id: 2, title: "Advanced Data Structures", pages: 72 },
    { id: 3, title: "Web Development Best Practices", pages: 58 },
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { role: "user", content: inputMessage },
      ]);
      setInputMessage("");
      setShowSuggestedQuestions(false);
      // Here you would typically send the message to your backend for processing
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setChatMessages([...chatMessages, { role: "user", content: question }]);
    setShowSuggestedQuestions(false);
    // Here you would typically send the question to your backend for processing
  };

  const handlePDFSelection = (pdfId: number) => {
    setSelectedPDFs((prev) =>
      prev.includes(pdfId)
        ? prev.filter((id) => id !== pdfId)
        : [...prev, pdfId]
    );
  };

  return (
    <div className="mx-auto flex h-screen pl-20 bg-gray-800">
      <ExpandableSidebar />
      {/* Left Section - Chat Interface */}
      <div className="flex flex-col w-2/3 p-4 max-w-7xl">
        <ScrollArea className="flex-grow mb-4 rounded-lg p-4">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-3 rounded-lg text-white ${
                  message.role === "user" ? "bg-blue-100/20" : "bg-gray-100/20"
                }`}
              >
                {message.content}
              </span>
            </div>
          ))}
          {showSuggestedQuestions && (
            <div className="mt-4">
              <h3 className="mb-2 font-semibold text-white">
                Suggested Questions:
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    className="max-w-3xl w-fit"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="flex gap-2 bg-green-500/50 p-1 rounded-full justify-center items-center">
          <Input
            className="rounded-full text-md font-semibold mx-2"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button className="rounded-full w-12 h-12" onClick={handleSendMessage}><Send className="w-full" /></Button>
        </div>
      </div>

      {/* Right Section - PDF List and Upload */}
      <div className="w-1/3 p-4 bg-gray-50/10 backdrop-blur-3xl m-3 rounded-xl">
        <Card className="mb-4 bg-gray-600/80 border-none">
          <CardHeader>
            <CardTitle className="text-white">Upload PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <Upload className="mr-2 h-4 w-4" /> Upload PDF
            </Button>
          </CardContent>
        </Card>
        <h2 className="text-xl font-bold mb-4 text-white">Your Research paper Pdfs</h2>
        <ScrollArea className="h-[calc(100vh-250px)]">
          {pdfList.map((pdf) => (
            <Card key={pdf.id} className="mb-4 bg-gray-600/50 border-none shadow-xl text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">{pdf.title}</CardTitle>
                <Checkbox
                  id={`pdf-${pdf.id}`}
                  checked={selectedPDFs.includes(pdf.id)}
                  onCheckedChange={() => handlePDFSelection(pdf.id)}
                />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-200">{pdf.pages} pages</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-fit bg-gray-900 hover:bg-gray-950 hover:text-gray-200 border-none">
                  <File className="mr-2 h-4 w-4" /> View PDF
                </Button>
              </CardFooter>
            </Card>
          ))}
          {selectedPDFs.length > 0 && (
            <div className="">
              <Button className="w-full">
                Analyze Selected PDFs ({selectedPDFs.length})
              </Button>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
