import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function BlogUploadSuccessMessage({ success }) {
  return (
    <AnimatePresence>
      {success && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="rounded-xl border border-emerald-400/35 bg-emerald-500/15 px-4 py-3 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-emerald-200">
            <CheckCircle2 size={16} />
            <span className="text-sm font-semibold">Story published successfully.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
