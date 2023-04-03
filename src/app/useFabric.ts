import { useEffect, useCallback, MutableRefObject } from "react";
import { fabric } from "fabric";

export function useFabric(
  fabricRef: MutableRefObject<fabric.Canvas | null>,
  canvasRef: MutableRefObject<HTMLCanvasElement | null>
) {
  const initFabric = useCallback(() => {
    if (canvasRef.current) {
      fabricRef.current = new fabric.Canvas(canvasRef.current, {
        isDrawingMode: true,
        width: 700,
        height: 700,
      });
    }
  }, [canvasRef, fabricRef]);
  const disposeFabric = useCallback(() => {
    if (fabricRef.current) {
      fabricRef.current.dispose();
    }
  }, [fabricRef]);
  useEffect(() => {
    initFabric();

    return () => {
      disposeFabric();
    };
  }, [initFabric, disposeFabric]);

  return {};
}
