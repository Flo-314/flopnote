/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client"
import React, { useState, useEffect, useRef} from 'react';
import { fabric } from "fabric"
import CanvasAnimation from './CanvasAnimation';
import CanvasLightBox from './CanvasLightbox';
import CanvasTrimedImages from './CanvasTrimedImages';
import CanvasPager from './CanvasPager';
import { useFabric } from './useFabric';
import { usePageData } from './usePageData';
import { useToolBar } from './useToolBar';
const Canvas = () => {
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useFabric(fabricRef, canvasRef)
  const {drawingColor,setDrawingColor, drawingLineWidth, setDrawingLineWidth, isLightBox, setIsLightBox} = useToolBar(fabricRef)
  const { trimedImages, animationPlay, animationStop, handlePageMove, pageIndex, animationInterval } = usePageData(fabricRef)
  return (
    <div>
      <div>
        <input
          type="color"
          value={drawingColor}
          onChange={(e) => {
            setDrawingColor(e.target.value);
          }}
        />
        <CanvasPager drawingLineWidth={drawingLineWidth} pageIndex={pageIndex} setDrawingLineWidth={setDrawingLineWidth} handlePageMove={handlePageMove} ></CanvasPager>
      </div>
      <div style={{ position: "relative" }}>
        <canvas ref={canvasRef} />
        <CanvasLightBox isLightBox={isLightBox} animationInterval={animationInterval.current} imageSrc={trimedImages[pageIndex - 1]}></CanvasLightBox>
      </div>
      <CanvasTrimedImages trimedImages={trimedImages} handlePageMove={handlePageMove} ></CanvasTrimedImages>
      <CanvasAnimation onPlay={() => animationPlay()} onStop={() => { animationStop() }}></CanvasAnimation>
      <button onClick={() => setIsLightBox(!isLightBox)}>switch lightbox</button>
    </div>
  )
};

export default Canvas;

