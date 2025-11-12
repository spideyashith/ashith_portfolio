'use client';

import { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Subtle Floating Particles
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  const count = 1000;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00BCD4"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ElegantSpaceScene = () => {
  return (
    <>
      <Stars 
        radius={100} 
        depth={60} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      <FloatingParticles />
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} color="#4DD0E1" intensity={0.3} distance={50} />
    </>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Fixed: Canvas with proper positioning */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <motion.div 
          style={{ y, opacity: 0.4 }}
          className="w-full h-full"
        >
          <Canvas 
            camera={{ position: [0, 0, 10], fov: 60 }}
            gl={{ 
              antialias: true,
              alpha: true,
              premultipliedAlpha: false
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            <Suspense fallback={null}>
              <ElegantSpaceScene />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content Layer - Above Everything - FIXED: merged style objects */}
      <motion.div 
        style={{ opacity, zIndex: 10 }}
        className="relative text-center px-4 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-cyan-400 text-xl md:text-2xl mb-6 tracking-widest font-light">
            Hi, I&apos;m
          </p>
        </motion.div>

        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            {'Ashith Fernandes'.split('').map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
                style={{
                  background: letter === ' ' ? 'none' : 'linear-gradient(135deg, #FFFFFF 0%, #00BCD4 50%, #FFFFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: letter === ' ' ? 'transparent' : 'transparent',
                  backgroundSize: '200% auto',
                  marginRight: letter === ' ' ? '0.5rem' : '0',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-gray-400 text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Full-Stack Developer | AI Enthusiast | Building innovative web experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 bg-cyan-500/90 hover:bg-cyan-400 text-white rounded-xl font-medium transition-all duration-300"
            style={{
              boxShadow: '0 8px 30px rgba(0, 188, 212, 0.25)'
            }}
          >
            View My Work
          </motion.a>
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 border border-cyan-400/50 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm"
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - FIXED: merged style objects */}
      <motion.div
        style={{ opacity, zIndex: 10 }}
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-5 h-9 border border-cyan-400/50 rounded-full flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-2 bg-cyan-400/70 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
