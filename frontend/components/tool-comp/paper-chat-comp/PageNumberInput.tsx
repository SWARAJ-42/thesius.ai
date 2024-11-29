"use client"
import React, { useState } from "react";

type PageNumberInputProps = {
  currentPage: number;
  numPages: number | undefined;
  setCurrentPage: (page: number) => void;
};

export default function PageNumberInput({ currentPage, numPages, setCurrentPage }: PageNumberInputProps) {
  const [inputPage, setInputPage] = useState<number | string>(currentPage);

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setInputPage(""); // Empty input case
    } else {
      const pageNumber = parseInt(value, 10);
      setInputPage(isNaN(pageNumber) ? currentPage : pageNumber); // Validating number input
    }
  };

  const goToPage = () => {
    if (typeof inputPage === "number" && inputPage >= 1 && numPages && inputPage <= numPages) {
      setCurrentPage(inputPage);
    } else {
      alert(`Please enter a number between 1 and ${numPages}`);
    }
  };

  return (
    <div className="page-number-input my-3 text-center">
      <label htmlFor="page-input" className="mr-2">
        Go to page:
      </label>
      <input
        id="page-input"
        type="number"
        value={inputPage}
        onChange={handlePageChange}
        className="bg-black p-2 rounded-md text-white w-16 text-center"
        min={1}
        max={numPages}
      />
      <button className="bg-blue-500 p-2 ml-2 rounded-md" onClick={goToPage}>
        Go
      </button>
    </div>
  );
}
