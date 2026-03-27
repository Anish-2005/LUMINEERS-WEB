"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedJourneys from "./components/FeaturedJourneys";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="page-shell">
      <Navbar />
      <main>
        <Hero />
        <FeaturedJourneys />
      </main>
      <Footer />
    </div>
  );
}
