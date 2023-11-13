import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import HomePage from "./pages/HomePage";
import VolcanoList from "./pages/VolcanoList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Volcano from "./pages/Volcano";

import Layout from "./components/LayOut/Layout";


function App() {
  const [token, setToken] = useState("");  
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/VolcanoList" element={<VolcanoList />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Login" element={<Login setToken={setToken} />}></Route>
        <Route path="/Volcano/:id" element={<Volcano token={token} key={token} />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
