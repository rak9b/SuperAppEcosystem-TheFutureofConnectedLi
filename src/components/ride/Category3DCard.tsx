import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface Category3DCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  gradient: string;
  onClick: () => void;
  isActive?: boolean;
}

export function Category3DCard({ title, subtitle, icon, gradient, onClick, isActive }: Category3DCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative h-32 md:h-40 w-full rounded-2xl cursor-pointer overflow-hidden shadow-lg transition-all duration-300 ${isActive ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : 'hover:shadow-2xl'}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
      
      <div style={{ transform: "translateZ(30px)" }} className="absolute inset-0 p-4 flex flex-col justify-between">
        <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md text-white">
          {icon}
        </div>
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
          <p className="text-white/70 text-xs">{subtitle}</p>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}
