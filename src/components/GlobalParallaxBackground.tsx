import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function GlobalParallaxBackground() {
  const { scrollYProgress } = useScroll();

  // Background floating orbs
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[10%] w-64 h-64 bg-[#dd711c] rounded-full blur-[150px] opacity-10" />
      <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[10%] w-96 h-96 bg-[#dd711c] rounded-full blur-[200px] opacity-[0.07]" />
      <motion.div style={{ y: y3 }} className="absolute top-[70%] left-[30%] w-72 h-72 bg-blue-600 rounded-full blur-[180px] opacity-10" />
      <motion.div style={{ y: y4 }} className="absolute top-[20%] right-[40%] w-48 h-48 bg-[#dd711c] rounded-full blur-[100px] opacity-[0.08]" />
      
      {/* Abstract floating shapes */}
      <motion.div style={{ y: y2, rotate: y1 }} className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/5 rounded-full" />
      <motion.div style={{ y: y3, rotate: y2 }} className="absolute top-3/4 right-1/4 w-48 h-48 border border-[#dd711c]/10 rounded-full" />
    </div>
  );
}
