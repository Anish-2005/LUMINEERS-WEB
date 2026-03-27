import UploadPageClient from "./UploadPageClient";

export const metadata = {
  title: "Upload Story",
  description:
    "Publish your travel experience on Lumineers with rich storytelling, destination tags, and visual cover previews.",
  alternates: {
    canonical: "/upload",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Publish a Travel Story | Lumineers",
    description:
      "Publish your travel experience on Lumineers with rich storytelling, destination tags, and visual cover previews.",
    url: "https://lumineers-web.vercel.app/upload",
    images: ["/image.png"],
  },
  twitter: {
    title: "Publish a Travel Story | Lumineers",
    description:
      "Publish your travel experience on Lumineers with rich storytelling, destination tags, and visual cover previews.",
    images: ["/image.png"],
  },
};

export default function UploadPage() {
  return <UploadPageClient />;
}
