/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import SignatureCanvas from "react-signature-canvas";
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [signature, setSignature] = useState<SignatureCanvas | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageData, setPageData] = useState<Array<Array<SignaturePad.Point>>[]>(
    []
  );
  const [trimImages, setTrimImages] = useState<string[]>([]);

  let animationInterval = useRef<any>(null);
  const handleClear = () => {
    signature?.clear();
  };

  const animatePages = () => {
    setPageIndex((pageIndex) => (pageIndex + 1) % pageData.length);
  };

  const handleUndo = () => {
    const lines = signature?.toData() || [];
    lines.pop();
    signature?.fromData(lines);
  };

  const savePageData = (pageIndexToMove: number) => {
    if (signature) {
      const data = signature.toData();
      const updatedPageData = [...pageData];
      updatedPageData[pageIndex] = data;

      //MAYBE ITS NOT THE BEST PLACE HERE.
      if (updatedPageData[pageIndexToMove] === undefined) {
        updatedPageData[pageIndexToMove] = [];
      }

      setPageData(updatedPageData);
    }
  };
  const updateTrim = () => {
    if (signature) {
      const trim = signature.toDataURL("image/png");
      const updatedTrimImages = [...trimImages]; // copia la matriz actual
      updatedTrimImages[pageIndex] = trim; // actualiza el elemento en el índice i
      setTrimImages(updatedTrimImages);
    }
  };

  const handlePageMove = (pageIndexToMove: number) => {
    if (signature) {
      updateTrim();
      savePageData(pageIndexToMove);
      setPageIndex(pageIndexToMove);
    }
  };

  useEffect(() => {
    if (signature && pageData?.length > 0) {
      signature.fromData(pageData[pageIndex]);
    }
  }, [pageData, pageIndex, signature]);

  return (
    <div>
      <div>
        {trimImages.length > 0 && animationInterval.current === null ? (
          <img
            src={trimImages[pageIndex - 1]}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0.3,
              zIndex: -1,
            }}
          />
        ) : null}

        <SignatureCanvas
          ref={setSignature}
          canvasProps={{ width: 700, height: 700 }}
        />
      </div>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleUndo}>Undo</button>
      <button
        onClick={() => {
          handlePageMove(pageIndex > 0 ? pageIndex - 1 : pageIndex);
        }}
      >
        before page
      </button>
      <button
        onClick={() => {
          handlePageMove(pageIndex + 1);
        }}
      >
        next page
      </button>

      <div>page: {pageIndex + 1}</div>

      <div className="flex gap-4">
        {trimImages.map((page, index) => {
          return (
            <div
              onClick={() => {
                handlePageMove(index);
              }}
              key={index}
            >
              <img className="w-32  h-32 border-4 border-black" src={page} />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          if(!animationInterval.current){ 
            handlePageMove(0)

          animationInterval.current = setInterval(() => {
            animatePages();
          }, 200); // cambie este valor para ajustar la velocidad de la animación
        }}}
      >
        Play
      </button>

      <button
        onClick={() => {
          clearInterval(animationInterval.current);
          animationInterval.current = null;
        }}
      >
        Stop
      </button>
    </div>
  );
}
