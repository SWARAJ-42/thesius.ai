"use client";

import React, { useContext } from "react";
import { InputBox } from "./SubComponents/input-box";
import SearchPaperContext from "@/context/SearchPapersContext";
import { PaperCard } from "../common-comp/paper-card";
import { PaperData } from "@/lib/tools/searchengine/fetchresponse";

function Playground() {
  const searchpapercontext = useContext(SearchPaperContext);
  const { searchPaperPage, setSearchPaperPage } = searchpapercontext;
  if (!searchPaperPage) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <InputBox />
      </div>
    );
  }

  const query = searchPaperPage.query;
  const queryResult = searchPaperPage.queryResult;

  return (
    <div className="w-full h-[100vh]">
      <InputBox />
      <div className="mx-auto w-fit">
        <div className="my-2"></div>
        {queryResult.data.map((paper: PaperData) => (
          <PaperCard paper={paper} />
        ))}
      </div>
    </div>
  );
}

export default Playground;
