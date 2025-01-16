"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaperCard } from "../../common-comp/paper-card";
import { PaperData, QueryResult } from "@/lib/tools/searchengine/fetchResponse";
import { useSearchPaper } from "@/context/SearchPapersContext";

interface PaginatedPaperResultsProps {
  queryResult: QueryResult;
  query: string;
}

export function PaginatedPaperResults({
  queryResult,
  query,
}: PaginatedPaperResultsProps) {
  const {currentPage, setCurrentPage} = useSearchPaper();
  const itemsPerPage = 1;
  const totalPages = Math.ceil(queryResult.data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = queryResult.data.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" });
};

  return (
    <div className="pr-2 rounded-xl">
      {currentItems.map((paperList: PaperData[], index: number) =>
        paperList.map((paper: PaperData, paperIndex: number) => (
          <PaperCard
            key={paperIndex}
            query={query}
            query_answer={queryResult.final_answer}
            paper={paper}
          />
        ))
      )}
      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) paginate(currentPage - 1);
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        paginate(pageNumber);
                      }}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return <PaginationEllipsis key={pageNumber} />;
              }
              return null;
            })}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) paginate(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
