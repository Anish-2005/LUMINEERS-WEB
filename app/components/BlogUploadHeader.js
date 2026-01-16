import { motion } from "framer-motion";
import { User, LogOut } from "lucide-react";

export default function BlogUploadHeader({ user, writingProgress, handleLogout }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10"
    >
      <div className="flex items-center gap-4">
        <motion.div whileHover={{ scale: 1.1 }} className="relative group">
          <img
            src={user.photoURL}
            alt="author"
            className="w-16 h-16 rounded-2xl border-2 border-white/20 shadow-xl"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity" />
        </motion.div>
        <div>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <User size={14} />
            Writing as
          </p>
          <h2 className="text-2xl font-bold">{user.displayName}</h2>
          <p className="text-sm text-gray-500">Explorer Level: Adventurer</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Progress indicator */}
        <div className="hidden md:block">
          <div className="flex items-center gap-3">
            <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${writingProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-sm text-gray-400">{Math.round(writingProgress)}%</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all"
        >
          <LogOut size={16} />
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
}
