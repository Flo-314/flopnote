/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fabric } from "fabric"
import CanvasLightBox from './CanvasLightbox';
type PageData = {
    version: string;
    objects: Object[];
  };  

const CanvasDrawing = () => {
    const [drawingColor, setDrawingColor] = useState('#000000');
    const [drawingLineWidth, setDrawingLineWidth] = useState(2);
    const [pageData, setPageData] = useState<PageData[]>([])
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [isLightBox, setIsLightBox] = useState<boolean>(true);
  
    const [trimedImages, setTrimedImages] = useState<string[]>([]);
  
    let animationInterval = useRef<number | null>(null);
  
  
    const fabricRef = useRef<fabric.Canvas | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
  

    const initFabric = useCallback(() => {
      if (canvasRef.current) {
        fabricRef.current = new fabric.Canvas(canvasRef.current, { isDrawingMode: true, width: 700, height: 700, });
      }
    }, [])
    const disposeFabric = useCallback(() => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
      }
    }, [])
   
    
  
  
    useEffect(() => {
  
      initFabric();
  
      return () => {
        disposeFabric();
      };
    }, [initFabric, disposeFabric]);
    // check that every brush propiertis changes when changes
    useEffect(() => {
      if (fabricRef.current) {
        const freeDrawingBrush = fabricRef.current.freeDrawingBrush
  
        freeDrawingBrush.color = drawingColor
        freeDrawingBrush.width = drawingLineWidth
  
  
  
      }
    }, [drawingColor, drawingLineWidth])
  
 
  
    return (
  <>          <canvas ref={canvasRef} />
  </>
  
  
  
    )
};

export default CanvasDrawing;

