import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import DarkNavbar from "./components/DarkNavbar";
import Footer from "./components/Footer";
// Pages
import Home from "./Pages/Home";
import About from "./components/About";
import Knowledge from "./components/Knowledge";
import Contact from "./components/Contact";
// Background (keep it, but it must sit behind content)
import PrismBackground from "./components/PrismBackground.jsx";

export default function App() {
  return (
    <Router>
      {/* background - fine to keep at top */}
      <PrismBackground />

      {/* SITE ROOT: everything visible must live inside this wrapper */}
      <div className="site-root">
        <DarkNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer
          whatsappNumber="+919752469028"
          instagram="https://www.instagram.com/vibeswithshubh?igsh=Z3k4c3JoODVmejJq"
          linkedin="https://www.linkedin.com/in/shubham-patidar-87b6b9381?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          github="https://github.com/yourname"
          email="knowcodewithshuh@gmail.com"
          location="Mandsaur, Madhya Pradesh"
        />
      </div>
    </Router>
  );
}
