"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, ChevronRight } from "lucide-react";
import { PaperData } from "@/lib/tools/searchengine/fetchresponse";
import MultiAbstractChatModal from "./multi-abstract-modal";

interface PaperCheckBox {
  paperId: string;
  title: string;
  year: number;
  citationCount: number;
}

export interface RenderedPapersProp {
  renderedPapers: PaperData[];
}

export default function DiveDeeper({ renderedPapers }: RenderedPapersProp) {
  const [papers, setPapers] = useState<PaperCheckBox[]>([]);
  const [selectedPapers, setSelectedPapers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPapersData, setSelectedPapersData] = useState<PaperData[]>([])
  const router = useRouter();

  const filteredPapers = papers.filter((paper) =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPaper = (paperId: string) => {
    setSelectedPapers((prev) =>
      prev.includes(paperId)
        ? prev.filter((id) => id !== paperId)
        : [...prev, paperId]
    );
  };


  useEffect(() => {
    const papersCheckBox = renderedPapers.map((paper) => ({
      paperId: paper.paperId,
      title: paper.title,
      year: Number(paper.year),
      citationCount: paper.citationCount,
    }));
    setPapers(papersCheckBox);

    const handleProceed = () => {
      const selectedPaperDetails = renderedPapers.filter(paper => selectedPapers.includes(paper.paperId))
      setSelectedPapersData(selectedPaperDetails)
    };
    handleProceed()

  }, [renderedPapers, selectedPapers]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-xl min-h-full space-y-6 rounded-xl">
      <h1 className="text-lg font-bold">
        Select the papers from the results for further to chat with them
      </h1>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search papers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <MultiAbstractChatModal renderedPapers={selectedPapersData} />
      {/* <div className="flex justify-end">
        <Button
          onClick={handleProceed}
          disabled={selectedPapers.length === 0}
          className="flex items-center space-x-2"
        >
          <span>Chat with selected papers</span>
          <ChevronRight size={20} />
        </Button>
      </div> */}
      <ul className="space-y-4">
        {filteredPapers.map((paper) => (
          <li
            key={paper.paperId}
            className="flex items-center space-x-4 p-2 bg-white rounded-lg shadow"
          >
            <Checkbox
              id={`paper-${paper.paperId}`}
              checked={selectedPapers.includes(paper.paperId)}
              onCheckedChange={() => handleSelectPaper(paper.paperId)}
            />
            <label
              htmlFor={`paper-${paper.paperId}`}
              className="flex-grow cursor-pointer"
            >
              <h2 className="text-sm font-semibold">{paper.title}</h2>
              <p className="text-sm text-gray-600">
                citations: {paper.citationCount}, year: {paper.year}
              </p>
            </label>
          </li>
        ))}
      </ul>
      {filteredPapers.length === 0 && (
        <p className="text-center text-gray-500">
          No papers found matching your search.
        </p>
      )}
    </div>
  );
}
