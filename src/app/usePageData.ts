import {useState, useEffect, useRef, useCallback, MutableRefObject} from "react";
import {fabric} from "fabric";

type PageData = {
  version: string;
  objects: Object[];
};

export function usePageData(fabricRef: MutableRefObject<fabric.Canvas | null>) {
  const [pageData, setPageData] = useState<PageData[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [trimedImages, setTrimedImages] = useState<string[]>([]);
  let animationInterval = useRef<number | null>(null);
  const trimImage = () => {
    if (fabricRef.current) {
      const trim = fabricRef.current.toDataURL({format: "image/png"});
      const updatedTrimImages = [...trimedImages]; // copia la matriz actual

      updatedTrimImages[pageIndex] = trim; // actualiza el elemento en el índice i
      setTrimedImages(updatedTrimImages);
    }
  };
  const handlePageMove = (pageToMove: number) => {
    if (fabricRef.current) {
      const actualPageData = fabricRef.current.toJSON();

      trimImage();

      setPageData((prevState) => {
        const updatedPageData = [...prevState];

        updatedPageData[pageIndex] = actualPageData;
        if (!updatedPageData[pageIndex + 1]) {
          updatedPageData[pageIndex + 1] = {version: "5.1", objects: []};
        }

        return updatedPageData;
      });

      setPageIndex(pageToMove < 0 ? 0 : pageToMove);
    }
  };
  const loadData = useCallback(() => {
    if (fabricRef.current) {
      fabricRef.current.loadFromJSON(pageData[pageIndex], () => {});
    }
  }, [pageIndex, pageData, fabricRef]);
  const animatePages = () => {
    setPageIndex((pageIndex) => (pageIndex + 1) % pageData.length);
  };
  const animationPlay = () => {
    if (!animationInterval.current) {
      handlePageMove(0);

      animationInterval.current = window.setInterval(() => {
        animatePages();
      }, 200); // cambie este valor para ajustar la velocidad de la animación
    }
  };
  const animationStop = () => {
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
      animationInterval.current = null;
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    trimedImages,
    animationPlay,
    animationStop,
    handlePageMove,
    pageIndex,
    animationInterval,
  };
}
