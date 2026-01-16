import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function BlogUploadSuccessMessage({ success }) {
  return (
    <AnimatePresence>
      {success && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center py-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
        >
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="text-green-400" />
            <span className="text-green-400 font-semibold">
              Your story is now traveling the world!
            </span>
            <Sparkles className="text-green-400" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
