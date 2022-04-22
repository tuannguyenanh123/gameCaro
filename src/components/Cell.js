import React from "react";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  width: "100px",
  height: "100px",
};
const Cell = ({ data, index, handleClick }) => {
  const handleRender = () => {
    if (data[index] === "") {
      return <></>;
    } else if (data[index] === "X") {
      return <CloseIcon color="primary" fontSize="large" />;
    } else {
      return <PanoramaFishEyeIcon color="error" fontSize="large" />;
    }
  };
  return (
    <button
      style={style}
      onClick={() => {
        handleClick(index);
      }}
    >
      {handleRender()}
    </button>
  );
};

export default Cell;
