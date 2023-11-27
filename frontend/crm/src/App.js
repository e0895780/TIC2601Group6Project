import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Index from "./pages/Index";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import Opportunity from "./pages/Opportunity";
import Quotation from "./pages/Quotation";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="Index" element={<Index />} />
          <Route path="Account" element={<Account />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="Opportunity" element={<Opportunity />} />
          <Route path="Quotation" element={<Quotation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
