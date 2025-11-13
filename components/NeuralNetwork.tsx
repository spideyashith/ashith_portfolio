'use client';

import { useEffect, useRef } from 'react';

interface Node {
x: number;
y: number;
vx: number;
vy: number;
}

const NeuralNetwork = () => {
const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;

const ctx = canvas.getContext('2d');
if (!ctx) return;

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create nodes (neural network points)
const nodes: Node[] = [];
const nodeCount = 100;
const maxDistance = 150;

// Initialize nodes with random positions and velocities
for (let i = 0; i < nodeCount; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  });
}

// Animation function
function animate() {
  if (!ctx || !canvas) return;

  // Clear canvas with fade effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update and draw nodes
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    // Move node
    node.x += node.vx;
    node.y += node.vy;

    // Bounce off edges
    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

    // Draw node
    ctx.beginPath();
    ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#00BCD4';
    ctx.fill();

    // Draw connections to nearby nodes
    for (let j = i + 1; j < nodes.length; j++) {
      const otherNode = nodes[j];
      const dx = node.x - otherNode.x;
      const dy = node.y - otherNode.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = 1 - distance / maxDistance;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 188, 212, ${opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(otherNode.x, otherNode.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

// Handle resize
const handleResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
window.addEventListener('resize', handleResize);

return () => {
  window.removeEventListener('resize', handleResize);
};
}, []);

return (
<canvas
ref={canvasRef}
className="fixed inset-0 pointer-events-none"
style={{ zIndex: 0, opacity: 0.3 }}
/>
);
};

export default NeuralNetwork;