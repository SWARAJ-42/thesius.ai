"use client";

import React, { useContext } from "react";
import { InputBox } from "./SubComponents/input-box";
import SearchPaperContext from "@/context/SearchPapersContext";
import { PaperCard } from "../common-comp/paper-card";
import { PaperData } from "@/lib/tools/searchengine/fetchresponse";

function Playground() {
  const searchpapercontext = useContext(SearchPaperContext);
  
  const { searchPaperPage, setSearchPaperPage, paperRetrievalLoading, setPaperRetrievalLoading, paperRetrievalQuery, setPaperRetrievalQuery } = searchpapercontext;

  if (!searchPaperPage) {
    if (paperRetrievalLoading) {
        return (
          <div className="w-full h-[100vh]">
            <InputBox />
          </div>
        );
    }
    else {
      return (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <InputBox />
        </div>
      );
    }
  }

  const query = searchPaperPage.query;
  const queryResult = searchPaperPage.queryResult;

  return (
    <div className="w-full h-[100vh]">
      <InputBox />
      <div className="mx-auto w-fit">
        <div className="max-w-3xl my-1 p-3 mx-auto bg-gray-200 rounded-xl">
          <div className="text-gray-700 bg-gray-300 p-3 my-1 rounded-xl font-semibold">
            {queryResult.final_answer}
          </div>
        </div>
        {queryResult.data.map((paper: PaperData) => (
          <PaperCard paper={paper} />
        ))}
      </div>
    </div>
  );
}

export default Playground;
