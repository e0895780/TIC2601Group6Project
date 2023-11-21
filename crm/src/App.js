import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Opportunity from "./pages/Opportunity";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="Index" element={<Index />} />
          <Route path="Opportunity" element={<Opportunity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;