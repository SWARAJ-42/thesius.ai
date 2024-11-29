"use client"

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface SinglePaperChatStateContextType {
  selectedText: string;
  setSelectedText: (text: string) => void;
}

const SinglePaperChatStateContext = createContext<SinglePaperChatStateContextType | undefined>(undefined);

export const SinglePaperChatStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedText, setSelectedText] = useState<string>("");

  return (
    <SinglePaperChatStateContext.Provider value={{ selectedText, setSelectedText }}>
      {children}
    </SinglePaperChatStateContext.Provider>
  );
};

export const useSinglePaperChatState = (): SinglePaperChatStateContextType => {
  const context = useContext(SinglePaperChatStateContext);
  if (!context) {
    throw new Error('useSinglePaperChatState must be used within a SinglePaperChatStateProvider');
  }
  return context;
};
