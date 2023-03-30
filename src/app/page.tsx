"use client";
import { useRef, useState } from "react";

import CanvasDraw, {CanvasDrawProps} from "react-canvas-draw";

export default function Home() {
  const canvasRef = useRef<CanvasDraw | null>(null);
  const [CanvasDrawProp, setCanvasDrawProps] = useState(( {brushColor: "#0000000"}))
  return (
    <div className="w-full h-[100vh] my-auto">

      <div className=" w-full flex justify-center items-center">
        <CanvasDraw className="" {...CanvasDrawProp} ref={canvasRef} />
      </div>

      <div className="flex  gap-6 justify-center items-center">



<button onClick={() => {
setCanvasDrawProps({ ...CanvasDrawProp, brushColor: "#FFFFFFFF" });
}}>negro</button>
<button >borrar</button>
<button>guardar</button>
<button >cargar</button>
<div onClick={() => {
      if (canvasRef) {
        canvasRef.current?.undo();
      }
}}>undo</div>
</div>
    </div>
  );
}
