/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";

type props = {
  drawingLineWidth: any;
  pageIndex: any;
  handlePageMove: any;
  setDrawingLineWidth: any;
};
const CanvasPager = ({drawingLineWidth, pageIndex, handlePageMove, setDrawingLineWidth}: props) => {
  return (
    <>
      <input
        max="50"
        min="1"
        type="range"
        value={drawingLineWidth}
        onChange={(e) => {
          setDrawingLineWidth(Number(e.target.value));
        }}
      />
      <button
        onClick={() => {
          handlePageMove(pageIndex - 1);
        }}
      >
        pagina anterior{" "}
      </button>

      <button
        onClick={() => {
          handlePageMove(pageIndex + 1);
        }}
      >
        next page
      </button>
      <p className="text-8xl">{pageIndex}</p>
    </>
  );
};

export default CanvasPager;
