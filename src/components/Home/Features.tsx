import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            d="M50 10 L90 50 L50 90 L10 50 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="5" 
            className="text-primary"
          />
          <circle cx="50" cy="50" r="20" fill="currentColor" className="text-primary/20" />
        </svg>
      ),
      title: "Comprehensive Domain Exploration",
      description: "Dive deep into various computer science domains, understanding their unique trends, challenges, and opportunities.",
    },
    {
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            d="M20 50 Q50 20, 80 50 T140 50" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="5" 
            className="text-primary"
          />
          <circle cx="50" cy="50" r="15" fill="currentColor" className="text-primary/20" />
        </svg>
      ),
      title: "Personalized Assessment",
      description: "Complete tailored questionnaires that evaluate your aptitude, domain knowledge, and current skill levels.",
    },
    {
      svg: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle 
            cx="50" 
            cy="50" 
            r="40" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="5" 
            className="text-primary"
          />
          <circle cx="50" cy="50" r="20" fill="currentColor" className="text-primary/20" />
        </svg>
      ),
      title: "Precision Career Recommendations",
      description: "Receive data-driven job role suggestions precisely matched to your strengths, interests, and skills.",
    },
  ];

  return (
    <section className="relative py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
           <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Explore <span className="text-primary">Our Features</span>
          </h2>
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empowering your professional journey with intelligent insights.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card p-6 rounded-2xl border border-border/50 
                hover:border-primary/30 
                shadow-lg hover:shadow-xl 
                transition-all group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="w-16 h-16 mx-auto mb-6">
                {feature.svg}
              </div>
              <h3 className="text-xl font-bold text-card-foreground text-center mb-4 
                group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;