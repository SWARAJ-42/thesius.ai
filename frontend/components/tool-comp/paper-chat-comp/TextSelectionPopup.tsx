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
      className="pop-up"
      style={{
        position: "fixed",
        top: `${popUpPosition.top}px`,
        left: `${popUpPosition.left}px`,
        background: "#fff",
        border: "1px solid #ccc",
        padding: "5px",
        zIndex: 10,
      }}
    >
      <button className="text-black p-2 rounded-sm bg-blue-400">Ask AI</button>
    </div>
  );
}
