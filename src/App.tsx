import { useState } from "react";
import Home from "./components/pages/Home";
import HotdogStore from "./components/pages/HotdogStore";
import { Route, Routes } from "react-router-dom";
import data from "../hotdogData.json";
import "./App.css";

export type SingleShopDataType = {
  photo: string;
  name: string;
  location: string;
  rating: number;
  id: number;
  about: string;
};

function App() {
  const [hotdogShops, setHotdogShops] = useState<SingleShopDataType[]>(data);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home hotdogShops={hotdogShops} setHotdogShops={setHotdogShops} />
          }
        />
        <Route
          path="/store/:id"
          element={<HotdogStore hotdogShops={hotdogShops} />}
        />
      </Routes>
    </>
  );
}

export default App;
