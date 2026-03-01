// import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="h-screen flex items-center justify-center animate-pulse bg-zinc-900">
      <ClipLoader color="#1D9BF0" size={70} />
    </div>
  );
};

export default Spinner;
