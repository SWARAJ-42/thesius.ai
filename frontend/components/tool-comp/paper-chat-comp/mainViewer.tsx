"use client";
import { useCallback, useState, useEffect } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Document, Page, pdfjs } from "react-pdf";
import { experimental_useObject as useObject } from "ai/react";
import { textFilterSchema } from "@/app/api/use-object/textFilterSchema";
import { extractTextFromPage } from "@/lib/tools/paper-chat/pdfUtils";
import { options, maxWidth, resizeObserverOptions } from "@/lib/tools/paper-chat/config";
import { PDFFile, PDFDocumentProxy } from "@/types/pdfTypes";
import TextSelectionPopup from "./TextSelectionPopup";
import PageControls from "./PageControls";
import { z } from "zod";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./Sample.css";
import { Button } from "@/components/ui/button"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function MainViewer() {
  const LOCAL_STORAGE_KEY = "currentPage";
  const [isClient, setIsClient] = useState(false);
  const [file, setFile] = useState<PDFFile>("./sample.pdf");
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [popUpPosition, setPopUpPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedPage = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedPage ? parseInt(savedPage, 10) : 1;
    }
    return 1;
  });
  const [imageURL, setimageURL] = useState<string | null>(null);

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    if (entry) setContainerWidth(entry.contentRect.width);
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
    extractTextFromPage(file, 1, setExtractedText);
  }

  function handleTextSelection(event: React.MouseEvent) {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setPopUpPosition({ top: event.clientY + 10, left: event.clientX + 10 });
      setSelectedText(selection.toString());
    } else {
      setSelectedText(null);
      setPopUpPosition(null);
    }
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;
    const nextFile = files?.[0];
    if (nextFile) setFile(nextFile);
  }

  const { object, submit } = useObject({
    api: "/api/use-object/",
    schema: textFilterSchema,
  });

  const { object: visionObject, submit: visionSubmit } = useObject({
    api: "/api/convert/",
    schema: z.object({
      prompt: z
        .string()
        .describe("instruction sentence for vision language model"),
    }),
  });

  const Visualize = (input: string) => {
    setimageURL(null)
    visionSubmit(input);
    if (visionObject?.prompt) {
      input = visionObject?.prompt
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    console.log(input)
    setimageURL(`https://image.pollinations.ai/prompt/${input}`)
  };

  useEffect(() => {
    extractTextFromPage(file, currentPage, setExtractedText);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, currentPage.toString());
    }
    setIsClient(true);
  }, [currentPage, file]);

  if (!isClient) {
    return null;
  }
  return (
    <div className="flex">
      <div
        className="Example bg-[#525659] h-screen overflow-y-scroll"
        onMouseUp={handleTextSelection}
      >
        <PageControls
          currentPage={currentPage}
          numPages={numPages}
          onFileChange={onFileChange}
          setCurrentPage={setCurrentPage}
        />
        <div className="Example__container">
          <div className="Example__container__document" ref={setContainerRef}>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
            >
              <Page
                key={`page_${currentPage}`}
                pageNumber={currentPage}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            </Document>
          </div>
        </div>
      </div>

      <TextSelectionPopup
        selectedText={selectedText}
        popUpPosition={popUpPosition}
      />

      <div className="w-1/2">
        <div>
          <Button
            className="rounded my-4 mx-4 bg-blue-700 hover:bg-blue-800 text-white font-bold"
            onClick={() => submit(extractedText)}
          >
            Get visual text
          </Button>
          {/* <p className="mx-2 my-2">{extractedText}</p> */}
          <div className="max-h-[400px] overflow-y-scroll my-4">
            {object?.visualTextList?.map((text, index) => {
              if (!text) return null;
              return (
                <>
                  <div
                    className="block hover:cursor-pointer p-2 w-fit max-w-2xl my-2 mx-4 rounded bg-gray-700 hover:bg-gray-800 text-white font-bold"
                    onClick={() => {
                      Visualize(text);
                    }}
                  >
                    {text}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="mx-4">
          {imageURL? <img className="w-96 rounded-md" src={imageURL} alt="Generating Image" /> : <></>}
        </div>
      </div>
    </div>
  );
}
