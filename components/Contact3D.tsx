'use client';

import { useRef, useState, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Floating Communication Satellites
const Satellite = ({ position, speed }: { position: [number, number, number]; speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * speed;
      meshRef.current.position.x = position[0] + Math.sin(clock.getElapsedTime() * 0.5) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#00BCD4"
          metalness={0.8}
          roughness={0.2}
          emissive="#00BCD4"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const Contact3DScene = () => {
  return (
    <>
      <Stars radius={50} depth={30} count={2000} factor={3} fade speed={1} />
      <Satellite position={[-3, 2, -3]} speed={0.5} />
      <Satellite position={[3, -1, -4]} speed={0.3} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#00BCD4" intensity={0.5} />
    </>
  );
};

const Contact3D = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission (replace with your actual API endpoint)
    setTimeout(() => {
      console.log('Form data:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0f1419 50%, #000000 100%)'
      }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <Suspense fallback={null}>
            <Contact3DScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-24 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-center">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Touch</span>
          </h2>
          
          <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-cyan-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300"
                  placeholder="Your Name"
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-cyan-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </motion.div>
            </div>

            {/* Message Textarea */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="message" className="block text-sm font-medium text-cyan-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-500 backdrop-blur-sm resize-none transition-all duration-300"
                placeholder="Tell me about your project..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                status === 'sending'
                  ? 'bg-gray-600 cursor-not-allowed'
                  : status === 'success'
                  ? 'bg-green-500'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400'
              }`}
              style={{
                boxShadow: status === 'idle' ? '0 10px 40px rgba(0, 188, 212, 0.3)' : 'none'
              }}
            >
              {status === 'sending' && '✈️ Sending...'}
              {status === 'success' && '✓ Message Sent!'}
              {status === 'idle' && '🚀 Send Message'}
              {status === 'error' && '✗ Try Again'}
            </motion.button>

            {/* Success Message */}
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-400 font-medium"
              >
                Thanks for reaching out! I&apos;ll get back to you soon. 🎉
              </motion.p>
            )}
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-6">Or connect with me on:</p>
            <div className="flex justify-center gap-6">
              {[
                { icon: '💼', label: 'LinkedIn', href: '#' },
                { icon: '🐙', label: 'GitHub', href: '#' },
                { icon: '🐦', label: 'Twitter', href: '#' },
                { icon: '📧', label: 'Email', href: 'mailto:your.email@example.com' }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center text-2xl hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact3D;
