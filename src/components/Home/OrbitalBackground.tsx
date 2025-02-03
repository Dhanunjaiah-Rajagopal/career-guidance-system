
import { motion } from "framer-motion";

const OrbitalBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 
      bg-gradient-to-br 
      from-white/50 via-primary-for/5 to-white/50
      dark:from-background/20 dark:via-primary/5 dark:to-background/20
      opacity-90"></div>

    {/* More Dynamic Orbital Paths */}
    {[1, 2, 3].map((ring) => (
      <motion.div
        key={ring}
        className="absolute border-2 border-dotted rounded-full 
            border-primary/20 dark:border-primary/30"
        style={{
          width: `${ring * 35}%`,
          height: `${ring * 35}%`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)'
        }}
        animate={{
          rotate: [45, 405],
        }}
        transition={{
          duration: ring * 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}
  </div>
);

export default OrbitalBackground;