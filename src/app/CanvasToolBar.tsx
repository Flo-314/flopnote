/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";

import CanvasPager from "./CanvasPager";

type props = {
  drawingLineWidth: any;
  pageIndex: any;
  handlePageMove: any;
  setDrawingLineWidth: any;
  drawingColor: any;
  setDrawingColor: any;
};
const CanvasToolBar = ({
  drawingLineWidth,
  pageIndex,
  handlePageMove,
  setDrawingLineWidth,
  drawingColor,
  setDrawingColor,
}: props) => {
  return (
    <>
      <input
        type="color"
        value={drawingColor}
        onChange={(e) => {
          setDrawingColor(e.target.value);
        }}
      />
      <CanvasPager
        drawingLineWidth={drawingLineWidth}
        handlePageMove={handlePageMove}
        pageIndex={pageIndex}
        setDrawingLineWidth={setDrawingLineWidth}
      />
    </>
  );
};

export default CanvasToolBar;
