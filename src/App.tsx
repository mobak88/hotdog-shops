import { useState, createContext } from "react";
import Home from "./components/pages/Home";
import HotdogStore from "./components/pages/HotdogStore";
import { Route, Routes } from "react-router-dom";
import data from "../hotdogData.json";
import "./App.css";
import Login from "./components/login/Login";

export type SingleShopDataType = {
  photo: string;
  name: string;
  location: string;
  rating: number;
  id: number;
  about: string;
};

type LoggedInContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoggedInContext = createContext<LoggedInContextType>({
  isLoggedIn: false,
  setIsLoggedIn: (value) => {
    value;
  },
});

function App() {
  const [hotdogShops, setHotdogShops] = useState<SingleShopDataType[]>(data);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Login />
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
    </LoggedInContext.Provider>
  );
}

export default App;
