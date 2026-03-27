import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedJourneys from "./components/FeaturedJourneys";
import Footer from "./components/Footer";

export const metadata = {
  title: "Home",
  description:
    "Discover immersive travel journals, visual stories, and destination insights from explorers on Lumineers.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Lumineers | Travel Stories and Journals",
    description:
      "Discover immersive travel journals, visual stories, and destination insights from explorers on Lumineers.",
    url: "https://lumineers-web.vercel.app/",
    images: ["/image.png"],
  },
  twitter: {
    title: "Lumineers | Travel Stories and Journals",
    description:
      "Discover immersive travel journals, visual stories, and destination insights from explorers on Lumineers.",
    images: ["/image.png"],
  },
};

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
