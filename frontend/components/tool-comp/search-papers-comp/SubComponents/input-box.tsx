"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send} from "lucide-react";
import { fetchQueryResult } from "@/lib/tools/searchengine/fetchresponse"; // Import your fetchQueryResult function

export function InputBox() {
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > 0 && !isExpanded) {
      setIsExpanded(true);
    } else if (e.target.value.length === 0 && isExpanded) {
      setIsExpanded(false);
    }
  };

  const handleSubmit = async () => {
    if (input.trim().length > 0) {
      setIsLoading(true)
      try {
        const data = await fetchQueryResult(input); // Call fetchQueryResult with the input
        console.log("Response data:", data); // Handle the returned data as needed
        setIsExpanded(false);
      } catch (error) {
        console.error("Error fetching response:", error);
      }
      setIsLoading(false)
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && input.trim().length > 0) {
      e.preventDefault(); // Prevent new line
      handleSubmit();
    }
  };

  return (
    <div className="w-full p-4 ">
      <div className="max-w-2xl mx-auto p-2 relative bg-green-300/50 rounded-full shadow-xl overflow-hidden flex flex-row justify-center items-center">
        <Textarea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your problem statement..."
          className="w-full pr-16 py-4 px-6 text-gray-700 font-semibold text-md leading-tight focus:outline-none resize-none overflow-hidden rounded-full"
          style={{ minHeight: "20px", maxHeight: "60px" }}
        />
        <div className="px-2">
          <Button
            size="icon"
            onClick={handleSubmit}
            disabled={input.trim().length === 0 && isLoading}
            className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-300"
          >
            <Send className="h-6 w-6" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}