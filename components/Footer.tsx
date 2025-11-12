'use client';

import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-cyan-500/20 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm"
          >
            © 2025 Ashith Fernandes. All rights reserved.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex gap-6 text-sm text-gray-400"
          >
            <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-cyan-400 text-sm font-medium"
            style={{
              textShadow: '0 0 10px rgba(0, 188, 212, 0.5)'
            }}
          >
            Built with Next.js & Three.js ✨
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
