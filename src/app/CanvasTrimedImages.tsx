/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";

type props = {
  trimedImages: string[];
  handlePageMove: (pageToMove: number) => void;
};
const CanvasTrimedImages = ({trimedImages, handlePageMove}: props) => {
  return (
    <>
      <div className="flex gap-4">
        {trimedImages.map((page, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handlePageMove(index);
              }}
            >
              <img className="w-32  h-32 border-4 border-black" src={page} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CanvasTrimedImages;
