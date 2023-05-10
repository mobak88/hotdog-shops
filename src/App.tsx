import { useState } from "react";
import Home from "./components/pages/Home";
import HotdogStore from "./components/pages/HotdogStore";
import { Route, Routes } from "react-router-dom";
import data from "../hotdogData.json";
import "./App.css";

function App() {
  const [hotdogShops, setHotdogShops] = useState(data);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/books/:id"
          element={<HotdogStore hotdogShops={hotdogShops} />}
        />
      </Routes>
    </>
  );
}

export default App;
