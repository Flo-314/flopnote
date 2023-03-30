"use client";
import { useRef } from "react";

import CanvasDraw from "react-canvas-draw";

export default function Home() {
  const canvasRef = useRef<CanvasDraw | null>(null);

  return (
    <div className="w-full h-[100vh] my-auto">

      <div className=" w-full flex justify-center items-center">
        <CanvasDraw className="" ref={canvasRef} />
      </div>

      <div className="flex  gap-6 justify-center items-center">


<button>lapiz</button>
<button>negro</button>
<button>blanco</button>
<button>guardar</button>
<button>cargar</button>
<div onClick={() => {
      if (canvasRef) {
        canvasRef.current?.undo();
      }
}}>undo</div>
</div>
    </div>
  );
}
