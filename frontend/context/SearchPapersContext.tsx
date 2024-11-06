"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import { QueryResult } from "@/lib/tools/searchengine/fetchresponse";

export interface SearchPaperPage {
  query: string;
  queryResult: QueryResult;
  library: QueryResult[];
}

interface SearchPaperContextType {
  searchPaperPage: SearchPaperPage | null;
  setSearchPaperPage: (searchPaperPage: SearchPaperPage | null) => void;
}

const SearchPaperContext = createContext<SearchPaperContextType | undefined>(undefined);

interface SearchPaperProviderProps {
  children: ReactNode;
}

export const SearchPaperProvider: React.FC<SearchPaperProviderProps> = ({ children }) => {
  const [searchPaperPage, setSearchPaperPage] = useState<SearchPaperPage | null>(null);
  return (
    <SearchPaperContext.Provider value={{ searchPaperPage, setSearchPaperPage }}>
      {children}
    </SearchPaperContext.Provider>
  );
};

export const useSearchPaper = () => {
  const context = useContext(SearchPaperContext);
  if (!context) {
    throw new Error("useSearchPaper must be used within a SearchPaperProvider");
  }
  return context;
};

export default SearchPaperContext;