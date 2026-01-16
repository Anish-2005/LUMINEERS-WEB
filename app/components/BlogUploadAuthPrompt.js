import { motion } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";

export default function BlogUploadAuthPrompt({ handleLogin }) {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-blue-400 rounded-full"
            initial={{ x: Math.random() * 100 + 'vw', y: Math.random() * 100 + 'vh' }}
            animate={{
              x: [null, Math.random() * 100 + 'vw'],
              y: [null, Math.random() * 100 + 'vh'],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="text-center mb-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Globe className="w-20 h-20 text-blue-400" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Join the Chronicle
          </h1>
          <p className="text-gray-300 text-lg">
            Share your journey with fellow explorers. Your story awaits.
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <button
            onClick={handleLogin}
            className="relative w-full px-8 py-4 rounded-3xl bg-gray-900/90 backdrop-blur-xl border border-white/10 flex items-center justify-center gap-3 text-xl font-semibold hover:bg-gray-900/70 transition-all"
          >
            <img 
              src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
              alt="Google" 
              className="w-6 h-6"
            />
            Continue with Google
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            <Sparkles className="inline w-4 h-4 mr-2" />
            Your first story unlocks exclusive badges
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
