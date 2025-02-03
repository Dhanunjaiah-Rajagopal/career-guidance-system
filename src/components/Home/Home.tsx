import { 
    ChevronRight, 
    ArrowUpRight, 
    CheckCircle2, 
    User, 
    Award 
  } from 'lucide-react';
  import { Button } from "@/components/ui/button";
  import { motion } from "framer-motion";
  import OrbitalBackground from '@/components/Home/OrbitalBackground';
  import { Link } from 'react-router-dom';
  
  const Home = () => {

    return (
    <div>
      <section>
      <div className="relative min-h-screen w-full overflow-hidden 
        bg-white dark:bg-black 
        before:absolute before:inset-0 
        before:bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] 
        before:dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] 
        before:bg-[size:50px_50px] 
        before:opacity-30 
        before:-z-10">
        
        <OrbitalBackground />
        
        {/* Floating Accent Shapes */}
        <motion.div 
          className="absolute top-1/4 -left-20 
            w-96 h-96 
            bg-primary/5 dark:bg-primary/10 
            rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3], 
            scale: [0.5, 0.7, 0.5] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 -right-20 
            w-96 h-96 
            bg-secondary/5 dark:bg-secondary/10 
            rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3], 
            scale: [0.5, 0.7, 0.5] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            delay: 2.5,
            ease: "easeInOut" 
          }}
        />
        
        <div className="relative z-20 max-w-14xl mx-auto px- sm:px-6 lg:px-8 pt-32 pb-48 text-center">
          {/* Main Headline */}
          <motion.h1 
            className="text-7xl md:text-1xl font-extrabold tracking-tight 
              text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Navigate Your Career 
            <span className="block text-primary mt-4">
              With Confidence
            </span></h1>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            className="max-w-3xl mx-auto text-lg md:text-xl font-semibold
              text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Comprehensive career guidelines and resources to help you make 
            informed decisions, develop essential skills, and achieve your 
            professional goals.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex justify-center space-x-4 mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link to="/CareerPreference">
            <Button
                variant="default" 
                size="lg" 
                className="group"
              >
                
                Get Started
                
                    
              <ChevronRight 
                className="ml-2 group-hover:translate-x-1 transition-transform" 
                size={20} 
              />
            </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="group"
            >
              Explore Resources
              <ArrowUpRight 
                className="ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" 
                size={20} 
              />
            </Button>
          </motion.div>
          
          {/* Features Highlight */}
          <motion.div 
            className="flex justify-center space-x-8 
              text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { 
                icon: CheckCircle2, 
                color: "text-green-500", 
                text: "Personalized Guidance" 
              },
              { 
                icon: User, 
                color: "text-blue-500", 
                text: "Expert Insights" 
              },
              { 
                icon: Award, 
                color: "text-purple-500", 
                text: "Career Growth" 
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center hover:scale-105 transition-transform"
              >
                <feature.icon 
                  size={24} 
                  className={`mr-2 ${feature.color}`} 
                />
                {feature.text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      </section>
    </div>
    );
  };
  
  export default Home;