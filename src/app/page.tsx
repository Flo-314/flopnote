"use client";
import SignatureCanvas from 'react-signature-canvas'
import React, { useState, useEffect } from "react";

export default function Home() {
  const [signature, setSignature] = useState<SignatureCanvas | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [pageData, setPageData] = useState<Array<Array<SignaturePad.Point>>[]>([])
  const [trimImages, setTrimImages] = useState<string[]>([])
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
    <div >
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
          const trim =    signature?.toDataURL('image/png')
          const updatedTrimImages = [...trimImages]; // copia la matriz actual
          updatedTrimImages[pageIndex] = trim; // actualiza el elemento en el índice i
              setTrimImages(updatedTrimImages)
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
      const trim =    signature?.toDataURL('image/png')
      const updatedTrimImages = [...trimImages]; // copia la matriz actual
      updatedTrimImages[pageIndex] = trim; // actualiza el elemento en el índice i
          setTrimImages(updatedTrimImages)
          setPageData(updatedPageData); // actualiza el estado del componente con la nueva matriz
          setPageIndex(pageIndex + 1)
          handleClear()
        }
      }}>next page</button>

      <div>page: {pageIndex +1 }</div>
      
      <div className='flex gap-4'>
        {trimImages.map((page,index) => {
         return <div key={index} >
            <img 
            className="w-32  h-32 border-4 border-black"
          src={page} />

          </div>
         
        })}
      </div>

    </div>
  );
}