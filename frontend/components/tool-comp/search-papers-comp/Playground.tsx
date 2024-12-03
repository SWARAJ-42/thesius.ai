"use client";

import React, { useContext } from "react";
import { InputBox } from "./SubComponents/input-box";
import SearchPaperContext from "@/context/SearchPapersContext";
import { useSearchPaper } from "@/context/SearchPapersContext";
import { PaperCard } from "../common-comp/paper-card";
import { PaperData } from "@/lib/tools/searchengine/fetchresponse";
import FollowUpQuestionsCard from "../common-comp/follow-ups";
import DiveDeeper from "./SubComponents/DiveDeeper";
import { Sparkles, Search, Brain } from "lucide-react";

function Playground() {
  const {
    searchPaperPage,
    setSearchPaperPage,
    paperRetrievalLoading,
    setPaperRetrievalLoading,
    paperRetrievalQuery,
    setPaperRetrievalQuery,
  } = useSearchPaper(); // Use the hook

  if (!searchPaperPage) {
    if (paperRetrievalLoading) {
      return (
        <div className="mx-auto max-w-7xl w-full h-[100vh]">
          <InputBox />
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
      </div>
    );
  }

  const query = searchPaperPage.query;
  const queryResult = searchPaperPage.queryResult;

  return (
    <div className="mx-auto max-w-7xl w-full h-[100vh]">
      <InputBox />
      <div className="mx-auto max-w-7xl w-fit flex flex-row-reverse">
        <div className="max-w-3xl ml-2 p-3 h-fit rounded-xl">
          <div className="text-3xl my-2 font-bold text-white flex items-center">
            <span className="mr-2">AI Summary</span>
            <span>
              <Sparkles />
            </span>
          </div>
          <div className="text-gray-700 bg-gray-200 p-3 my-1 rounded-xl font-semibold">
            {queryResult.final_answer}
          </div>
          <div className="text-gray-700 rounded-xl font-semibold">
            <FollowUpQuestionsCard questions={queryResult.followup_questions} />
          </div>
          <div className="rounded-xl">
            <div className="text-3xl my-2 font-bold text-white flex items-center">
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
          <div className="text-3xl my-2 font-bold text-white flex items-center">
          <span className="mr-2">Results</span>
            <span>
              <Search />
            </span>
          </div>
          <div className="pr-2 rounded-xl">
            {queryResult.data.map((paper: PaperData) => (
              <PaperCard query={query} query_answer={queryResult.final_answer} paper={paper} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
