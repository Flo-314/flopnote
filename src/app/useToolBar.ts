import {useEffect, MutableRefObject, useState} from "react";
import {fabric} from "fabric";

export function useToolBar(fabricRef: MutableRefObject<fabric.Canvas | null>) {
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [drawingLineWidth, setDrawingLineWidth] = useState(2);
  const [isLightBox, setIsLightBox] = useState<boolean>(true);

  useEffect(() => {
    if (fabricRef.current) {
      const freeDrawingBrush = fabricRef.current.freeDrawingBrush;

      freeDrawingBrush.color = drawingColor;
      freeDrawingBrush.width = drawingLineWidth;
    }
  }, [drawingColor, drawingLineWidth, fabricRef]);

  return {
    drawingColor,
    setDrawingColor,
    drawingLineWidth,
    setDrawingLineWidth,
    isLightBox,
    setIsLightBox,
  };
}
