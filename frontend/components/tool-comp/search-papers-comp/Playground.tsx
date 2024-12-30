"use client";

import React, { useContext, useEffect } from "react";
import { InputBox } from "./SubComponents/input-box";
import SearchPaperContext, {
  SearchPaperPage,
} from "@/context/SearchPapersContext";
import { useSearchPaper } from "@/context/SearchPapersContext";
import { PaperCard } from "../common-comp/paper-card";
import {
  fetchQueryResultCache,
  PaperData,
} from "@/lib/tools/searchengine/fetchResponse";
import FollowUpQuestionsCard from "../common-comp/follow-ups";
import DiveDeeper from "./SubComponents/DiveDeeper";
import { Sparkles, Search, Brain } from "lucide-react";
import SearchResultSkeleton from "@/components/loading-skeletons/search-result-skeleton";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css"; // Import Katex CSS
import "./styles.css";

function Playground() {
  const {
    searchPaperPage,
    setSearchPaperPage,
    paperRetrievalLoading,
    setPaperRetrievalLoading,
    paperRetrievalQuery,
    setPaperRetrievalQuery,
  } = useSearchPaper(); // Use the hook

  useEffect(() => {
    const get_cache = async () => {
      if (searchPaperPage) return; // Prevent fetching if data already exists
      try {
        const data = await fetchQueryResultCache();
        console.log("Response data:", data);
        if (data) {
          const newSearchPaperPage: SearchPaperPage = {
            query: data.query,
            queryResult: data,
            library: [],
          };
          setSearchPaperPage(newSearchPaperPage);
          setPaperRetrievalQuery(data.query);
        }
      } catch (error) {
        console.error("Error fetching response:", error);
      }
    };

    get_cache();
  }, [paperRetrievalQuery, setSearchPaperPage]); // Remove `searchPaperPage` from the dependency array

  if (!searchPaperPage) {
    if (paperRetrievalLoading) {
      return (
        <div className="mx-auto max-w-7xl w-full">
          <InputBox />
          <SearchResultSkeleton />
        </div>
      );
    } else {
      return (
        <div className="max-w-3xl mx-auto w-full h-[100vh] flex justify-center items-center">
          <InputBox />
        </div>
      );
    }
  }
  if (paperRetrievalLoading) {
    return (
      <div className="mx-auto max-w-7xl w-full h-[100vh]">
        <InputBox />
        <SearchResultSkeleton />
      </div>
    );
  }

  const query = searchPaperPage.query;
  const queryResult = searchPaperPage.queryResult;

  return (
    <div className="mx-auto max-w-7xl w-full">
      <InputBox />
      <div className="mx-auto max-w-7xl w-fit flex flex-row-reverse">
        <div className="max-w-3xl ml-2 p-3 h-fit rounded-xl">
          <div className="text-3xl my-2 font-bold text-gray-900 flex items-center">
            <span className="mr-2">AI Summary</span>
            <span>
              <Sparkles />
            </span>
          </div>
          <div className="bg-gray-200 p-3 my-1 rounded-xl font-semibold h-[300px] overflow-y-scroll">
            <ReactMarkdown
              className="markdown text-sm"
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {queryResult.final_answer}
            </ReactMarkdown>
          </div>
          <div className="text-gray-700 rounded-xl font-semibold">
            <FollowUpQuestionsCard questions={queryResult.followup_questions} />
          </div>
          <div className="rounded-xl">
            <div className="text-3xl my-2 font-bold text-gray-900 flex items-center">
              <span className="mr-2">Dive Deeper</span>
              <span>
                <Brain />
              </span>
            </div>
            <div className="pr-2 rounded-xl">
              <DiveDeeper renderedPapers={queryResult.data} />
            </div>
          </div>
        </div>
        <div className="my-1 rounded-xl">
          <div className="text-3xl my-2 font-bold text-gray-900 flex items-center">
            <span className="mr-2">Results</span>
            <span>
              <Search />
            </span>
          </div>
          <div className="pr-2 rounded-xl">
            {queryResult.data.map((paper: PaperData) => (
              <PaperCard
                query={query}
                query_answer={queryResult.final_answer}
                paper={paper}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
