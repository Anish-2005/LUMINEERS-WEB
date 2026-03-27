import BlogsPageClient from "./BlogsPageClient";

export const metadata = {
  title: "Blogs",
  description:
    "Browse travel blogs and destination stories from creators sharing real-world journeys across cities, nature, and culture.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Travel Blogs | Lumineers",
    description:
      "Browse travel blogs and destination stories from creators sharing real-world journeys across cities, nature, and culture.",
    url: "https://lumineers-web.vercel.app/blogs",
    images: ["/image.png"],
  },
  twitter: {
    title: "Travel Blogs | Lumineers",
    description:
      "Browse travel blogs and destination stories from creators sharing real-world journeys across cities, nature, and culture.",
    images: ["/image.png"],
  },
};

export default function BlogsPage() {
  return <BlogsPageClient />;
}
