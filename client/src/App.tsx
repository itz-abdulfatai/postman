import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/global/Header";
import post from "./assets/design/Postman - home.png";
import { useEffect, useState } from "react";

function App() {
  const [viewing, setViewing] = useState(true);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // optional, stops page scrolling
        setViewing((prev) => !prev); // always has latest state
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {viewing && (
        <img className="absolute w-screen h-screen opacity-70" src={post} />
      )}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
