import React from "react";
import {prompt} from "./ImagePrompt";

const Image = () => {
  return (
    <img
      src="https://picsum.photos/200"
      alt="Test image"
      style={{ width: "25%" }}
    />
  );
};

export default Image;
