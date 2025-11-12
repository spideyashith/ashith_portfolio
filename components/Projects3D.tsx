'use client';

import { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Box } from '@react-three/drei';
import * as THREE from 'three';

// Floating Project Cubes
const ProjectCube = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <Box ref={meshRef} position={position} args={[1, 1, 1]}>
        <meshStandardMaterial
          color="#00BCD4"
          metalness={0.7}
          roughness={0.3}
          wireframe
        />
      </Box>
    </Float>
  );
};

const Projects3DScene = () => {
  return (
    <>
      <Stars radius={50} depth={30} count={2000} factor={3} fade speed={1} />
      <ProjectCube position={[-4, 2, -4]} />
      <ProjectCube position={[4, -1, -3]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#00BCD4" intensity={0.5} />
    </>
  );
};

const Projects3D = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 1], ['-100px', '100px']);

  const projects = [
    {
      title: 'S4 Holidays Travel Platform',
      description: 'Full-stack travel booking platform with Next.js and MongoDB',
      tech: ['Next.js', 'MongoDB', 'Tailwind'],
      image: '🌴'
    },
    {
      title: 'AI Stress Detection System',
      description: 'ML-powered stress detection for law enforcement personnel',
      tech: ['Python', 'TensorFlow', 'React'],
      image: '🧠'
    },
    {
      title: 'CareConnect Platform',
      description: 'Dementia care platform with real-time notifications',
      tech: ['React', 'Firebase', 'Node.js'],
      image: '💙'
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #1a1f2e 50%, #000000 100%)'
      }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <Projects3DScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-24"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-white mb-16 text-center"
        >
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, rotateY: -10 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              style={{ x: index % 2 === 0 ? x : undefined }}
              whileHover={{ scale: 1.02, rotateY: 5, z: 50 }}
              className="group relative"
            >
              <div className="h-full p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2"
                >
                  View Project →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects3D;
