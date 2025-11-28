import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface TiltCardProps {
  title: string;
  description: string;
  icon: any;
  gradient: string;
  link: string;
}

export function TiltCard({ title, description, icon: Icon, gradient, link }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

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
    setHover(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-64 w-full rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl cursor-pointer group"
    >
      <Link to={link} className="absolute inset-0 z-10" />
      
      <div 
        style={{ transform: "translateZ(75px)" }} 
        className="absolute inset-4 flex flex-col justify-between pointer-events-none"
      >
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="text-white h-6 w-6" />
        </div>

        <div>
          <h3 className="text-xl font-bold dark:text-white mb-2 group-hover:text-blue-500 transition-colors">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center text-sm font-bold text-slate-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          Explore Module <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div 
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} 
      />
    </motion.div>
  );
}
