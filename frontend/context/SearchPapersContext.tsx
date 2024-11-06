"use client";

import { createContext, ReactNode } from "react";
import axios from "axios";


interface SearchPaperContextType {

}

const SearchPaperContext = createContext<SearchPaperContextType | undefined>(undefined);

interface SearchPaperProviderProps {
  children: ReactNode;
}

export const SearchPaperProvider: React.FC<SearchPaperProviderProps> = ({ children }) => {
  
  return (
    <SearchPaperContext.Provider value={{ }}>
      {children}
    </SearchPaperContext.Provider>
  );
};

export default SearchPaperContext;