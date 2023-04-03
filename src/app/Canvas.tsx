"use client";
import React, {useRef} from "react";
import {fabric} from "fabric";

import CanvasAnimation from "./CanvasAnimation";
import CanvasLightBox from "./CanvasLightbox";
import CanvasTrimedImages from "./CanvasTrimedImages";
import {useFabric} from "./useFabric";
import {usePageData} from "./usePageData";
import {useToolBar} from "./useToolBar";
import CanvasToolBar from "./CanvasToolBar";
const Canvas = () => {
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useFabric(fabricRef, canvasRef);
  const {
    drawingColor,
    setDrawingColor,
    drawingLineWidth,
    setDrawingLineWidth,
    isLightBox,
    setIsLightBox,
  } = useToolBar(fabricRef);
  const {trimedImages, animationPlay, animationStop, handlePageMove, pageIndex, animationInterval} =
    usePageData(fabricRef);

  return (
    <div>
      <div>
        <CanvasToolBar
          drawingColor={drawingColor}
          drawingLineWidth={drawingLineWidth}
          handlePageMove={handlePageMove}
          pageIndex={pageIndex}
          setDrawingColor={setDrawingColor}
          setDrawingLineWidth={setDrawingLineWidth}
        />
      </div>
      <div style={{position: "relative"}}>
        <canvas ref={canvasRef} />
        <CanvasLightBox
          animationInterval={animationInterval.current}
          imageSrc={trimedImages[pageIndex - 1]}
          isLightBox={isLightBox}
        />
      </div>
      <CanvasTrimedImages handlePageMove={handlePageMove} trimedImages={trimedImages} />
      <CanvasAnimation
        onPlay={() => animationPlay()}
        onStop={() => {
          animationStop();
        }}
      />
      <button onClick={() => setIsLightBox(!isLightBox)}>switch lightbox</button>
    </div>
  );
};

export default Canvas;
