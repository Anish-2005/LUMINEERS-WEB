import { motion } from "framer-motion";
import { Globe, Lock } from "lucide-react";

export default function BlogUploadAuthPrompt({ handleLogin }) {
  return (
    <div className="surface-elevated mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 py-10 text-center">
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/35 bg-blue-500/15 text-blue-200"
      >
        <Globe size={30} />
      </motion.span>
      <h2 className="text-3xl font-semibold tracking-tight text-white">Sign in to publish</h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
        You need an authenticated account to create and publish stories in The Chronicle.
      </p>
      <button onClick={handleLogin} className="btn-primary mt-7">
        <Lock size={16} />
        Continue with Google
      </button>
      <p className="mt-4 text-xs text-slate-500">Authentication secures author attribution and publishing access.</p>
    </div>
  );
}
