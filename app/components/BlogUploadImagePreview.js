import { motion } from "framer-motion";
import Image from "next/image";

export default function BlogUploadImagePreview({ imageUrl }) {
  if (!imageUrl) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group overflow-hidden rounded-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
      <Image
        src={imageUrl}
        alt="preview"
        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute bottom-4 left-4 z-20">
        <p className="text-sm text-gray-300">Cover Preview</p>
      </div>
    </motion.div>
  );
}
