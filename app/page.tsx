'use client';

import { motion } from 'framer-motion';
import Achievements from '@/components/Achievements';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen w-[100vw] pb-2 px-4 sm:px-8 lg:px-16 overflow-x-hidden">
      <div className="text-center mt-32">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold"
        >
          Your Personalized Content
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-blue-500"
        >
          Universe
        </motion.h1>
      </div>

      <motion.div
        className="font-medium text-base sm:text-lg text-gray-500 dark:text-gray-300 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p>Discover, organize, and enjoy content from news, entertainment,</p>
        <p>and social media – all in one intelligent dashboard tailored just for you.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-sm sm:text-base transition duration-300">
          Get Started <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      <motion.div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full bg-gray-100 dark:bg-gray-800 rounded-xl px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Achievements count="10K+" title="Active Users" />
        <Achievements count="50K+" title="Content Items" />
        <Achievements count="99.9%" title="Uptime" />
        <Achievements count="24/7" title="Support" />
      </motion.div>
    </div>
  );
}
