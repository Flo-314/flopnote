"use client";
import SignatureCanvas from 'react-signature-canvas'
import React, { useState, useEffect } from "react";

export default function Home() {
  const [signature, setSignature] = useState<SignatureCanvas | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [pageData, setPageData] = useState<Array<Array<SignaturePad.Point>>[]>([])
  const handleClear = () => {
    signature?.clear();
  };

  const handleUndo = () => {
    const lines = signature?.toData() || [];
    lines.pop();
    signature?.fromData(lines);
  };
  useEffect(() => {
    if (signature && pageData?.length > 0) {
     signature.fromData(pageData[pageIndex])
    }
  }, [pageData, pageIndex, signature]);

  return (
    <div>
      <SignatureCanvas
        ref={setSignature}
        canvasProps={{ width: 500, height: 200 }}
      />
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={() => {
        if (signature) {
          const data = signature.toData()
          const updatedPageData = [...pageData]; // copia la matriz actual
          updatedPageData[pageIndex] = data; // actualiza el elemento en el índice i
          setPageData(updatedPageData); // actualiza el estado del componente con la nueva matriz
          setPageIndex(pageIndex > 0 ? pageIndex - 1 : 0)
        }

      }}>before page</button>
      <button onClick={() => {
        if (signature) {
          const data = signature.toData()
          const updatedPageData = [...pageData]; // copia la matriz actual
          updatedPageData[pageIndex] = data; // actualiza el elemento en el índice i
          if(updatedPageData[pageIndex +1] === undefined){
            updatedPageData[pageIndex +1] = []
          }
          setPageData(updatedPageData); // actualiza el estado del componente con la nueva matriz
          setPageIndex(pageIndex + 1)
          handleClear()
        }
      }}>next page</button>
    </div>
  );
}