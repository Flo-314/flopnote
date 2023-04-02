"use client"
import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

interface CanvasProps {
  brushColor: string;
  brushWidth: number;
  isErasing: boolean;
  onDraw: (dataUrl: string) => void;
  onClear: () => void;
}

const Canvas: React.FC<CanvasProps> = ({ brushColor, brushWidth, isErasing, onDraw, onClear }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current!);
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = brushWidth;
    canvas.freeDrawingBrush.color = brushColor;

    if (isErasing) {
      canvas.freeDrawingBrush.color = '#FFFFFF';
    }

    canvas.on('path:created', (e) => {
      onDraw(canvas.toDataURL());
    });

    return () => {
      canvas.off('path:created');
    };
  }, [brushColor, brushWidth, isErasing, onDraw]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      onClear();
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default Canvas;
