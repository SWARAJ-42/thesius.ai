"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // import router to navigate programmatically
import {
  ExternalLink,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import { PaperData, isOpenAccessPdf } from "@/lib/tools/searchengine/fetchresponse";

export interface PaperCardProps {
  paper: PaperData; 
  query: string;
  query_answer: string;
}

export function PaperCard({ paper, query, query_answer }: PaperCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter(); // initialize the router

  const handleCardClick = () => {
    const parcel:PaperCardProps = {
      paper: paper,
      query: query,
      query_answer: query_answer
    }
    const paperData = encodeURIComponent(JSON.stringify(parcel)); // Encode the paper data
    router.push(`/paperdetails/${paper.paperId}?paperData=${paperData}`); // Navigate with query parameter
  };

  return (
    <Card className="max-w-3xl mt-2 cursor-pointer" onClick={handleCardClick}>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{paper.title}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(paper.fieldsOfStudy) &&
            paper.fieldsOfStudy.map((label, index) => (
              <Badge key={index} variant="secondary">
                {label}
              </Badge>
            ))}
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Display paper abstract */}
        <Card className="bg-secondary/10">
          <CardContent className="p-3">
            <p className="text-sm text-muted-foreground">{paper.abstract}</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-primary/5">
            <CardContent className="p-3 flex flex-col items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-primary" />
                <span className="text-sm font-semibold">Citations:</span>
                <span className="text-lg font-bold text-primary">
                  {paper.citationCount}
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {paper.influentialCitationCount} influential
              </Badge>
            </CardContent>
          </Card>
          <Card className={paper.isOpenAccess ? "bg-green-100" : "bg-red-100"}>
            <CardContent className="p-3 flex flex-col items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen
                  size={16}
                  className={
                    paper.isOpenAccess ? "text-green-600" : "text-red-600"
                  }
                />
                <span className="text-sm font-semibold">
                  {paper.isOpenAccess ? "Open Access" : "Closed Access"}
                </span>
              </div>
              {paper.isOpenAccess && (
                <a
                  href={
                    isOpenAccessPdf(paper.openAccessPdf)
                      ? paper.openAccessPdf.url
                      : ""
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  View PDF <ExternalLink size={14} />
                </a>
              )}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}


{/* <Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger asChild>
    <Button
      variant="ghost"
      className="flex w-full justify-between px-2 py-0"
    >
      <span className="font-semibold">Abstract</span>
      {isOpen ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2">
    <Card className="bg-secondary/10">
      <CardContent className="p-3">
        <p className="text-sm text-muted-foreground">
          {paper.abstract}
        </p>
      </CardContent>
    </Card>
  </CollapsibleContent>
</Collapsible> */}
{/* <Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <CollapsibleTrigger asChild>
    <Button
      variant="ghost"
      className="flex w-full justify-between px-2 py-0 bg-gray-100"
    >
      <span className="font-semibold">TLDR</span>
      {isOpen ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="mt-2">
    <Card className="bg-secondary/10">
      <CardContent className="p-3">
        <p className="text-sm text-muted-foreground">
          {paper.tldr?.text}
        </p>
      </CardContent>
    </Card>
  </CollapsibleContent>
</Collapsible> */}