/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { User, LogOut, PenSquare } from "lucide-react";

export default function BlogUploadHeader({ user, writingProgress, handleLogout }) {
  return (
    <motion.div
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-6 flex flex-col gap-5 rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:p-5"
    >
      <div className="flex items-center gap-3">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "Author"}
            className="h-12 w-12 rounded-xl border border-slate-600/70 object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-700/80 text-slate-200">
            <User size={18} />
          </div>
        )}
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Active author</p>
          <h2 className="text-lg font-semibold text-slate-100">{user.displayName || "Explorer"}</h2>
          <p className="text-xs text-slate-400">{user.email || "Authenticated session"}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden rounded-xl border border-slate-700/70 bg-slate-900/80 px-3 py-2 sm:block">
          <div className="mb-1 flex items-center gap-1.5 text-xs text-slate-400">
            <PenSquare size={13} />
            Draft progress
          </div>
          <div className="h-1.5 w-44 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300"
              initial={{ width: 0 }}
              animate={{ width: `${writingProgress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
        <button onClick={handleLogout} className="btn-secondary px-3 py-2 text-xs">
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </motion.div>
  );
}
