
import { motion } from "framer-motion";

const CosmicBackground = () => {
  const orbitColors = [
    "from-blue-100/30 via-blue-200/20 to-blue-300/30",
    "from-purple-100/30 via-purple-200/20 to-purple-300/30",
    "from-cyan-100/30 via-cyan-200/20 to-cyan-300/30"
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Backdrop */}
      <div className="absolute inset-0 
        bg-gradient-to-br 
        from-white/40 via-primary/5 to-white/40
        dark:from-background/10 dark:via-primary/10 dark:to-background/10
        opacity-80"></div>

      {/* Dynamic Orbital Paths */}
      {[1, 2, 3].map((ring, index) => (
        <motion.div
          key={ring}
          className={`absolute border-2 border-dotted rounded-full 
            ${orbitColors[index]} 
            opacity-50 dark:opacity-30`}
          style={{
            width: `${ring * 40}%`,
            height: `${ring * 40}%`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)'
          }}
          animate={{
            rotate: [45, 405],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: ring * 15,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        />
      ))}

      {/* Subtle Particle Effects */}
      {[...Array(40)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-primary/20 dark:bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default CosmicBackground;