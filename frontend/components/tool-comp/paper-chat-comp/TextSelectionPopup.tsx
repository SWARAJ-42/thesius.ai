"use client"
import React from "react";

type TextSelectionPopupProps = {
  selectedText: string | null;
  popUpPosition: { top: number; left: number } | null;
};

export default function TextSelectionPopup({ selectedText, popUpPosition }: TextSelectionPopupProps) {
  if (!selectedText || !popUpPosition) return null;

  return (
    <div
      className="pop-up rounded-full bg-green-500"
      style={{
        position: "fixed",
        top: `${popUpPosition.top}px`,
        left: `${popUpPosition.left}px`,
        border: "1px solid #ccc",
        padding: "5px",
        zIndex: 10,
      }}
    >
      <button className="bg-green-700 text-white text-[12px] p-2 rounded-full hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Ask AI</button>
    </div>
  );
}
