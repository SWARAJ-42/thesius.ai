"use client"
import React from "react";
import PageNumberInput from "./PageNumberInput";

type PageControlsProps = {
  currentPage: number;
  numPages: number | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // Updated here
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PageControls({ currentPage, numPages, setCurrentPage, onFileChange }: PageControlsProps) {
  function goToPreviousPage() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Now this works correctly
  }

  function goToNextPage() {
    setCurrentPage((prevPage) => (numPages ? Math.min(prevPage + 1, numPages) : prevPage));
  }

  return (
    <div className="page-controls text-center z-100 bottom-10 bg-gray-800 p-2">
      <div className="my-2">
        <h1 className="font-bold">Viewer</h1>
      </div>
      <div className="my-3 w-full flex justify-center items-center">
        <input className="w-fit bg-black p-2 rounded-md" onChange={onFileChange} type="file" />
      </div>
      <button className="bg-black p-2 rounded mx-2" onClick={goToPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {numPages}</span>
      <button className="bg-black p-2 rounded mx-2" onClick={goToNextPage} disabled={currentPage === numPages}>
        Next
      </button>
      <PageNumberInput currentPage={currentPage} numPages={numPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}
