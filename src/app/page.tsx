"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fabric } from "fabric"

type PageData = {
  version: string;
  objects: Object[];
};


const App = () => {
  const [drawingColor, setDrawingColor] = useState('#000000');
  const [drawingLineWidth, setDrawingLineWidth] = useState(2);
  const [pageData, setPageData] = useState<PageData[]>([])
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [lightBox, setLightBox] = useState<boolean>(true);

  const [trimedImages, setTrimedImages] = useState<string[]>([]);

  let animationInterval = useRef<any>(null);


  const fabricRef = useRef<fabric.Canvas | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

const trimImage = () => {
    if (fabricRef.current) {
      const trim = fabricRef.current.toDataURL({format:"image/png"});
      const updatedTrimImages = [...trimedImages]; // copia la matriz actual
      updatedTrimImages[pageIndex] = trim; // actualiza el elemento en el índice i
      setTrimedImages(updatedTrimImages);
    }
}
  const initFabric = useCallback(() => {
    if (canvasRef.current) {
      fabricRef.current = new fabric.Canvas(canvasRef.current, { isDrawingMode: true, width: 700, height: 700, });
    }
  },[])
  const disposeFabric = useCallback(() => {
    if (fabricRef.current) {
      fabricRef.current.dispose();
    }
  },[])
 
  const handlePageMove = (pageToMove: number) => {
    if (fabricRef.current) {
      const actualPageData = fabricRef.current.toJSON();
      trimImage()

      setPageData((prevState) => {
        const updatedPageData = [...prevState];
        updatedPageData[pageIndex] = actualPageData;
        if (!updatedPageData[pageIndex + 1]) {
          updatedPageData[pageIndex + 1] = { version: "5.1", objects: [] };
        }
        return updatedPageData;
      });

  
      setPageIndex(pageToMove < 0 ? 0 : pageToMove);
    }
  };

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

  const loadData = useCallback(() => {
    if (fabricRef.current) {
      fabricRef.current.loadFromJSON(pageData[pageIndex], () => { })
    }
  }, [pageIndex, pageData]);

const animatePages = () => {
  setPageIndex((pageIndex) => (pageIndex + 1) % pageData.length);

}

  useEffect(() => {
    loadData()

  }, [loadData])

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
        <button onClick={() => { loadData() }}>load data</button>
        <button onClick={() => { handlePageMove(pageIndex - 1) }}>pagina anterior </button>

        <button onClick={() => {
          handlePageMove(pageIndex + 1)
        }}>next page</button>
        <p className='text-8xl'>{pageIndex}</p>
        
      </div>
    
      <div style={{ position: "relative" }}>
  <canvas ref={canvasRef} />
  {lightBox &&  !animationInterval.current && (
    <img
      src={trimedImages[pageIndex - 1]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.3,
        zIndex: -1,
      }}
    />
  )}
</div>

      
      <div className="flex gap-4">
        {trimedImages.map((page, index) => {
          return (
            <div
              onClick={() => {
                handlePageMove(index);
              }}
              key={index}
            >
              <img className="w-32  h-32 border-4 border-black" src={page} />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          if(!animationInterval.current){ 
            handlePageMove(0)

          animationInterval.current = setInterval(() => {
            animatePages();
          }, 200); // cambie este valor para ajustar la velocidad de la animación
        }}}
      >
        Play
      </button>

      <button
        onClick={() => {
          clearInterval(animationInterval.current);
          animationInterval.current = null;
        }}
      >
        Stop
      </button>

<button onClick={(() => {
  setLightBox(!lightBox)
})}>switch lightbox</button>
    </div>

  )
};

export default App;

