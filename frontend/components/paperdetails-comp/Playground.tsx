"use client";

import { useState, useEffect } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  BookOpenIcon,
  UsersIcon,
  LinkIcon,
  FileTextIcon,
  GraduationCapIcon,
  ExternalLinkIcon,
  ExternalLink,
  BookOpen,
  GitFork,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import RelavantPapers from "./SubComponents/relevant-papers";
import PaperRelevance from "./SubComponents/query-answer";
import {
  AllRelatedPapersLinks,
  Citation,
  PaperResponse,
} from "@/lib/paperdetails/schema";
// import { PaperData } from "@/lib/tools/searchengine/fetchresponse";
import {
  fetchPaperDetails,
  SearchRelatedPaperPdfLinks,
} from "@/lib/paperdetails/fetchResponse";
import Link from "next/link";
import { PaperCardProps } from "../tool-comp/common-comp/paper-card";
import { Footer } from "../global-comp/Footer";
import PaperDetailSkeleton from "../loading-skeletons/paper-detail-skeleton";

interface CitationProps {
  paper: Citation;
}

function PaperCardCiteRef({ paper }: CitationProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{paper.title}</CardTitle>
        <CardDescription className="overflow-y-scroll max-h-20">
          {paper.authors.map((author, index) => (
            <Badge variant="secondary" className="m-1" key={author.authorId}>
              {author.name}
            </Badge>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground font-bold">{paper.year}</p>
        <p className="text-sm text-muted-foreground font-bold">{paper.venue}</p>
        <Link
          href={`${paper.url}`}
          className="mt-2 text-blue-500 flex items-center"
        >
          <span className="mx-1">View on Semantic scholar</span>
          <ExternalLink />
        </Link>
      </CardContent>
    </Card>
  );
}

export default function Component() {
  const [activeTab, setActiveTab] = useState("references");
  const [isOpen, setIsOpen] = useState(false);
  const [parsedPaperprops, setParsedPaperProps] =
    useState<PaperCardProps | null>(null); // State to store parsedPaper
  const [mainPaperDetails, setMainPaper] = useState<PaperResponse | null>(null); // State to store fetched paper details
  const [relatedPapers, setRelatedPapers] =
    useState<AllRelatedPapersLinks | null>(null);
  const [paperDetailsLoading, setpaperDetailsLoading] = useState(true); // Loading state
  const searchParams = useSearchParams();
  const paperData = searchParams.get("paperData");
  const router = useRouter(); // initialize the router

  useEffect(() => {
    const getPaperDetails = async () => {
      if (paperData) {
        const parsed = JSON.parse(decodeURIComponent(paperData)); // Decode and parse
        setParsedPaperProps(parsed); // Store parsedPaper in state
        console.log("Parsed paper data:", parsed);

        const fetchedPaper = await fetchPaperDetails(parsed.paper.paperId); // Call fetch function
        const relatedPapers = await SearchRelatedPaperPdfLinks(parsed.query);
        if (fetchedPaper) {
          setMainPaper(fetchedPaper); // Store fetched data in state
          console.log("Fetched paper details:", fetchedPaper);
        }
        if (relatedPapers) {
          setRelatedPapers(relatedPapers);
          console.log("Fetched related papers from links:", relatedPapers);
          setpaperDetailsLoading(false);
        }
      } else {
        setpaperDetailsLoading(false);
        notFound();
      }
    };
    getPaperDetails();
  }, [paperData]);

  const handleButtonClick = (title: string, url: any) => {
    const parcel = {
      title: title,
      url: url
    }
    const paperData = encodeURIComponent(JSON.stringify(parcel)); // Encode the paper data
    router.push(`/tool/paper-chat?paperData=${paperData}`); // Navigate with query parameter
  };

  const parsedPaper = parsedPaperprops?.paper;

  if (paperDetailsLoading) {
    return (
      <div className="container mx-auto p-6">
        <PaperDetailSkeleton />
      </div>
    );
  }

  if (mainPaperDetails && parsedPaper) {
    return (
      <div className="container mx-auto p-6">
        <PaperRelevance
          query={parsedPaperprops.query}
          answer={parsedPaperprops.query_answer}
        />
        <div className="flex">
          <div>
            <div className="container mx-auto p-4 bg-background rounded-xl">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-4xl font-bold">
                    {mainPaperDetails.title}
                  </CardTitle>
                  <CardDescription className="flex flex-wrap gap-2 mt-2">
                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>{mainPaperDetails.numCitedBy} Citations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GitFork className="w-4 h-4" />
                        <span>{mainPaperDetails.numCiting} References</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{mainPaperDetails.fieldsOfStudy.join(", ")}</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 rounded-xl border p-3">
                    <p className="text-3xl font-bold mb-2">Abstract</p>
                    {mainPaperDetails.abstract}
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <Badge variant="outline" className="text-sm">
                      {mainPaperDetails.year}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {mainPaperDetails.venue}
                    </Badge>
                    {mainPaperDetails.doi && (
                      <Badge variant="outline" className="text-sm">
                        DOI: {mainPaperDetails.doi}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <div className="flex justify-between items-center">
                  <Card
                    className={
                      parsedPaper.isOpenAccess
                        ? "bg-green-100 m-4 flex-grow"
                        : "bg-red-100 m-4 flex-grow"
                    }
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen
                          size={16}
                          className={
                            parsedPaper.isOpenAccess
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        />
                        <span className="text-sm font-semibold">
                          {parsedPaper.isOpenAccess
                            ? "Research paper is accessible"
                            : "Research paper is not accessible"}
                        </span>
                      </div>
                      {parsedPaper.isOpenAccess && (
                        <a
                          href={parsedPaper.openAccessPdf?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                        >
                          View PDF <ExternalLink size={14} />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                  {parsedPaper.isOpenAccess ? (
                    <Button onClick={()=>{handleButtonClick(mainPaperDetails.title, parsedPaper.openAccessPdf?.url)}} className="mx-4 w-1/3 font-bold rounded-xl p-5">Chat with this paper</Button>
                  ) : (
                    <></>
                  )}
                </div>
              </Card>
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-between w-full p-10 mb-2 bg-gray-100 hover:bg-gray-200"
                  >
                    <span className="font-semibold text-3xl">Authors</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="my-2 space-y-2">
                  {mainPaperDetails.authors.map((author) => (
                    <Card
                      key={author.authorId}
                      className="bg-white transition-all hover:shadow-md"
                    >
                      <a
                        href={author.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4"
                      >
                        <CardContent className="flex items-center space-x-4 p-0">
                          <User className="h-6 w-6 " />
                          <span className="text-sm text-gray-700 hover:text-gray-800">
                            {author.name}
                          </span>
                        </CardContent>
                      </a>
                    </Card>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="citations">
                    Citations ({mainPaperDetails.citations.length})
                  </TabsTrigger>
                  <TabsTrigger value="references">
                    References ({mainPaperDetails.references.length})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="citations">
                  <ScrollArea className="h-[400px] rounded-md border p-4">
                    {mainPaperDetails.citations.map((citation) => (
                      <PaperCardCiteRef
                        key={citation.paperId}
                        paper={citation}
                      />
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="references">
                  <ScrollArea className="h-[400px] rounded-md border p-4">
                    {mainPaperDetails.references.map((reference) => (
                      <PaperCardCiteRef
                        key={reference.paperId}
                        paper={reference}
                      />
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
              <div className="mt-8 text-center">
                <a
                  href={mainPaperDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary hover:underline text-blue-500"
                >
                  <span>View on Semantic Scholar</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-background rounded-xl ml-2">
            {relatedPapers?.results && (
              <RelavantPapers results={relatedPapers?.results} />
            )}
          </div>
        </div>
      </div>
    );
  }
  // const mainPaperDetails: PaperResponse = {
  //   abstract:
  //     "We introduce S2ORC, a large corpus of 81.1M English-language academic papers spanning many academic disciplines. The corpus consists of rich metadata, paper abstracts, resolved bibliographic references, as well as structured full text for 8.1M open access papers. Full text is annotated with automatically-detected inline mentions of citations, figures, and tables, each linked to their corresponding paper objects. In S2ORC, we aggregate papers from hundreds of academic publishers and digital archives into a unified source, and create the largest publicly-available collection of machine-readable academic text to date. We hope this resource will facilitate research and development of tools and tasks for text mining over academic text.",
  //   arxivId: null,
  //   authors: [
  //     {
  //       authorId: "46258841",
  //       name: "Kyle Lo",
  //       url: "https://www.semanticscholar.org/author/46258841",
  //     },
  //     {
  //       authorId: "31860505",
  //       name: "Lucy Lu Wang",
  //       url: "https://www.semanticscholar.org/author/31860505",
  //     },
  //     {
  //       authorId: "2060376981",
  //       name: "Mark Neumann",
  //       url: "https://www.semanticscholar.org/author/2060376981",
  //     },
  //     {
  //       authorId: "143967880",
  //       name: "Rodney Michael Kinney",
  //       url: "https://www.semanticscholar.org/author/143967880",
  //     },
  //     {
  //       authorId: "1780531",
  //       name: "Daniel S. Weld",
  //       url: "https://www.semanticscholar.org/author/1780531",
  //     },
  //   ],
  //   citationVelocity: 130,
  //   citations: [
  //     {
  //       arxivId: "2411.04403",
  //       authors: [
  //         { authorId: "2329559831", name: "Zhichao Geng" },
  //         { authorId: "2329559417", name: "Dongyu Ru" },
  //         { authorId: "2329855848", name: "Yang Yang" },
  //       ],
  //       doi: null,
  //       intent: [],
  //       isInfluential: false,
  //       paperId: "dbd5190d984af38a016cf0747bcb16db7ed7e933",
  //       title:
  //         "Towards Competitive Search Relevance For Inference-Free Learned Sparse Retrievers",
  //       url: "https://www.semanticscholar.org/paper/dbd5190d984af38a016cf0747bcb16db7ed7e933",
  //       venue: "",
  //       year: 2024,
  //     },
  //   ],
  //   corpusId: 215416146,
  //   doi: "10.18653/V1/2020.ACL-MAIN.447",
  //   fieldsOfStudy: ["Computer Science"],
  //   influentialCitationCount: 89,
  //   isOpenAccess: true,
  //   isPublisherLicensed: true,
  //   is_open_access: true,
  //   is_publisher_licensed: true,
  //   numCitedBy: 513,
  //   numCiting: 59,
  //   paperId: "5c5751d45e298cea054f32b392c12c61027d2fe7",
  //   references: [
  //     {
  //       arxivId: "2004.10706",
  //       authors: [
  //         { authorId: "31860505", name: "Lucy Lu Wang" },
  //         { authorId: "46258841", name: "Kyle Lo" },
  //         { authorId: "1648642525", name: "Yoganand Chandrasekhar" },
  //       ],
  //       doi: null,
  //       intent: [],
  //       isInfluential: false,
  //       paperId: "bc411487f305e451d7485e53202ec241fcc97d3b",
  //       title: "CORD-19: The Covid-19 Open Research Dataset",
  //       url: "https://www.semanticscholar.org/paper/bc411487f305e451d7485e53202ec241fcc97d3b",
  //       venue: "NLPCOVID19",
  //       year: 2020,
  //     },
  //   ],
  //   s2FieldsOfStudy: [
  //     { category: "Computer Science", source: "external" },
  //     { category: "Computer Science", source: "s2-fos-model" },
  //   ],
  //   title: "S2ORC: The Semantic Scholar Open Research Corpus",
  //   topics: [],
  //   url: "https://www.semanticscholar.org/paper/5c5751d45e298cea054f32b392c12c61027d2fe7",
  //   venue: "Annual Meeting of the Association for Computational Linguistics",
  //   year: 2020,
  // };
}
