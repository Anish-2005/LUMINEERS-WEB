/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";

export default function BlogUploadImagePreview({ imageUrl }) {
  if (!imageUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/80"
    >
      <div className="relative h-52">
        <img
          src={imageUrl}
          alt="Cover preview"
          className="h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
        <p className="absolute bottom-3 left-3 text-xs uppercase tracking-[0.1em] text-slate-200">Cover preview</p>
      </div>
    </motion.div>
  );
}
