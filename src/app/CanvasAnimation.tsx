/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
type props = {
  onPlay: () => void;
  onStop: () => void;
};
const CanvasAnimation = ({onPlay, onStop}: props) => {
  return (
    <>
      <button onClick={onPlay}>Play</button>
      <button onClick={onStop}>Stop</button>
    </>
  );
};

export default CanvasAnimation;
