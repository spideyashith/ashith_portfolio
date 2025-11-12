'use client';

import { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const About3D = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0f1419 50%, #000000 100%)'
      }}
    >
      {/* Subtle Space Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={3000} factor={4} fade speed={1} />
            <ambientLight intensity={0.1} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-16 text-center">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl flex items-center justify-center text-8xl backdrop-blur-sm border border-cyan-500/20">
                👨‍💻
              </div>
            </motion.div>

            {/* About Text */}
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                I&apos;m a <span className="text-cyan-400 font-medium">Full-Stack Developer</span> passionate about creating innovative web experiences that blend cutting-edge technology with stunning design.
              </p>
              <p>
                With expertise in <span className="text-cyan-400">Next.js</span>, <span className="text-cyan-400">React</span>, and <span className="text-cyan-400">AI/ML</span>, I build scalable applications that solve real-world problems.
              </p>
              <p>
                Currently exploring <span className="text-cyan-400">3D web experiences</span> and <span className="text-cyan-400">immersive interfaces</span> that push the boundaries of what&apos;s possible on the web.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About3D;
