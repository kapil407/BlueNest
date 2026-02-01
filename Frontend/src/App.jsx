import { useEffect, useState } from "react";
import Body from "./Components/Body";
import Home from "./Components/Home";
import { Toaster } from "react-hot-toast";
// import ThemeToggle from "./Components/Theme";

function App() {
  return (
    <>
      <Body />

      <Toaster />
    </>
  );
}

export default App;
