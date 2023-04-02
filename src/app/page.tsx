"use client"
import React, { useState, useEffect, useRef } from 'react';
import { fabric } from "fabric"
const App = () => {
  const [drawingColor, setDrawingColor] = useState('#000000');
  const [drawingLineWidth, setDrawingLineWidth] = useState(2);
  const [state, setState] = useState<any>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const initFabric = () => {
    if (canvasRef.current) {
      fabricRef.current = new fabric.Canvas(canvasRef.current, { isDrawingMode: true, width: 700, height: 700,  });
    }
  };

  const disposeFabric = () => {
    if (fabricRef.current) {
      fabricRef.current.dispose();
    }
  };
  const saveData = () => {
    if (fabricRef.current) {
      console.log("asd")
      let a = fabricRef.current.toJSON()
      setState(a)
    }
  };
  const loadData = () => {
    if (fabricRef.current) {
      console.log(state)
        fabricRef.current.loadFromJSON(state,() => {})
    
    }
  };
  useEffect(() => {

    initFabric();

    return () => {
      disposeFabric();
    };
  }, []);


  useEffect(() => {
    if (fabricRef.current) {
      const freeDrawingBrush = fabricRef.current.freeDrawingBrush

      freeDrawingBrush.color= drawingColor
      freeDrawingBrush.width= drawingLineWidth
  
      
  
  }
  }, [drawingColor, drawingLineWidth])

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
      <input
        type="range"
        min="1"
        max="50"
        value={drawingLineWidth}
        onChange={(e) => {
          setDrawingLineWidth(Number(e.target.value));
        }}
      />
    <button onClick={() => {saveData()}}>save data</button>
    <button onClick={() => {loadData()}}>load data</button>

      <canvas ref={canvasRef} />
    </div>
    

    </div>

  )
};

export default App;

