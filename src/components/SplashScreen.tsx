import React from 'react';
import { motion } from 'motion/react';
import { FileSearch } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.2,
          type: "spring",
          stiffness: 100 
        }}
        className="relative"
      >
        <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full" />
        <FileSearch className="w-24 h-24 text-emerald-400 relative z-10" />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          RESU<span className="text-emerald-400">SCAN</span>
        </h1>
        <p className="mt-2 text-zinc-400 font-mono text-sm tracking-widest uppercase">
          AI Resume Intelligence
        </p>
      </motion.div>

      <motion.div 
        className="absolute bottom-12 w-48 h-1 bg-zinc-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div 
          className="h-full bg-emerald-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};
