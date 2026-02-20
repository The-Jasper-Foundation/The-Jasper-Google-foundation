/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wand2, 
  Shield, 
  Zap, 
  Sun, 
  Leaf, 
  Music, 
  Target, 
  Moon, 
  Sparkles,
  RefreshCw,
  Dices
} from 'lucide-react';
import { CLASSES, NAME_PREFIXES, NAME_SUFFIXES } from './constants';

const ICON_MAP: Record<string, React.ReactNode> = {
  Wand2: <Wand2 className="w-12 h-12" />,
  Shield: <Shield className="w-12 h-12" />,
  Zap: <Zap className="w-12 h-12" />,
  Sun: <Sun className="w-12 h-12" />,
  Leaf: <Leaf className="w-12 h-12" />,
  Music: <Music className="w-12 h-12" />,
  Target: <Target className="w-12 h-12" />,
  Moon: <Moon className="w-12 h-12" />,
};

interface Character {
  name: string;
  classInfo: typeof CLASSES[0];
  id: number;
}

export default function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCharacter = useCallback(() => {
    setIsGenerating(true);
    
    // Simulate a bit of "magic" delay
    setTimeout(() => {
      const randomPrefix = NAME_PREFIXES[Math.floor(Math.random() * NAME_PREFIXES.length)];
      const randomSuffix = NAME_SUFFIXES[Math.floor(Math.random() * NAME_SUFFIXES.length)];
      const randomClass = CLASSES[Math.floor(Math.random() * CLASSES.length)];
      
      setCharacter({
        name: `${randomPrefix}${randomSuffix}`,
        classInfo: randomClass,
        id: Date.now(),
      });
      setIsGenerating(false);
    }, 400);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#1A1A1A] font-sans selection:bg-yellow-200 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-300 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300 blur-3xl animate-pulse delay-700" />
      </div>

      <header className="text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/5 shadow-sm mb-4"
        >
          <Sparkles className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-bold tracking-widest uppercase">Magic Workshop</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          FANTASY <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">HERO</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-md mx-auto">
          Who will you be today? Click the magic dice to find your inner adventurer!
        </p>
      </header>

      <main className="w-full max-w-md relative z-10">
        <AnimatePresence mode="wait">
          {character ? (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 5 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className="relative"
            >
              {/* Character Card */}
              <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-2 border-black overflow-hidden group">
                {/* Header/Class Badge */}
                <div className={`absolute top-0 right-0 ${character.classInfo.color} text-white px-6 py-2 rounded-bl-3xl font-black tracking-tighter text-xl border-l-2 border-b-2 border-black`}>
                  {character.classInfo.name}
                </div>

                {/* Icon Section */}
                <div className="flex justify-center mb-8 mt-4">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className={`w-24 h-24 rounded-full ${character.classInfo.color} flex items-center justify-center text-white shadow-lg border-4 border-white`}
                  >
                    {ICON_MAP[character.classInfo.icon]}
                  </motion.div>
                </div>

                {/* Info Section */}
                <div className="text-center space-y-4">
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-black tracking-tight"
                  >
                    {character.name}
                  </motion.h2>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="h-px bg-slate-100 w-1/2 mx-auto"
                  />
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-slate-600 font-medium leading-relaxed"
                  >
                    {character.classInfo.description}
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-5xl mt-4"
                  >
                    {character.classInfo.emoji}
                  </motion.div>
                </div>

                {/* Decorative Dots */}
                <div className="absolute bottom-4 left-4 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                  <div className="w-2 h-2 rounded-full bg-slate-200" />
                </div>
              </div>

              {/* Card Shadow/Layer Effect */}
              <div className="absolute -inset-2 bg-black rounded-[36px] -z-10 translate-x-2 translate-y-2 opacity-10" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-300 rounded-[32px] h-[400px] flex flex-col items-center justify-center text-slate-400"
            >
              <Dices className="w-16 h-16 mb-4 animate-bounce" />
              <p className="font-bold">Ready to meet your hero?</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        <div className="mt-12 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateCharacter}
            disabled={isGenerating}
            className={`
              relative group px-10 py-5 rounded-full font-black text-2xl tracking-tighter
              bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]
              flex items-center gap-3 overflow-hidden
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <span className="relative z-10 flex items-center gap-3">
              {isGenerating ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : (
                <Dices className="w-6 h-6" />
              )}
              {character ? "CREATE ANOTHER" : "MEET YOUR HERO"}
            </span>
            
            {/* Hover Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>
      </main>

      <footer className="mt-auto py-8 text-slate-400 text-sm font-bold tracking-widest uppercase">
        Made with magic for little adventurers
      </footer>
    </div>
  );
}
