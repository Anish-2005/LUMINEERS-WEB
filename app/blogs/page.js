
import BlogGallery from '../BlogGallery';
import Footer from '../Footer';
import Navbar from '../Navbar';

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-800 to-black text-white font-sans relative overflow-x-hidden">
      <Navbar />
      <section className="py-20">
        <h1 className="text-center text-4xl md:text-5xl font-bold mb-8 text-gradient animate-fade-in">Latest Adventures</h1>
        <BlogGallery />
      </section>
      <Footer />
    </div>
  );
}
