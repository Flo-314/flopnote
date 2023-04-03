/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";

type props = {
  isLightBox: Boolean;
  animationInterval: number | null;
  imageSrc: string;
};
const CanvasLightBox = ({isLightBox, animationInterval, imageSrc}: props) => {
  return (
    <>
      {isLightBox && !animationInterval && (
        <img
          src={imageSrc}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.3,
            zIndex: -1,
          }}
        />
      )}
    </>
  );
};

export default CanvasLightBox;
