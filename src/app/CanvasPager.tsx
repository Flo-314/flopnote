/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fabric } from "fabric"

type props  ={
    drawingLineWidth: any, pageIndex:any, handlePageMove:any, setDrawingLineWidth:any
}
const CanvasPager = ({drawingLineWidth, pageIndex, handlePageMove, setDrawingLineWidth}: props)   => {
 return( <>
      <input
          type="range"
          min="1"
          max="50"
          value={drawingLineWidth}
          onChange={(e) => {
            setDrawingLineWidth(Number(e.target.value));
          }}
        />
        <button onClick={() => { handlePageMove(pageIndex - 1) }}>pagina anterior </button>

        <button onClick={() => {
          handlePageMove(pageIndex + 1)
        }}>next page</button>
        <p className='text-8xl'>{pageIndex}</p>

 </>)
};

export default CanvasPager;

