import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import CosmicBackground from "./CosmicBackground";

const FoundationSection = () => {
    const toolCards = [
        {
          icon: "https://reactjs.org/favicon.ico",
          title: "React",
          subtitle: "A JavaScript library for building user interfaces, used for developing web and native applications. It powers the frontend of modern web apps like Next.js.",
          link: "https://react.dev",
        },
        {
          icon: "https://appwrite.io/images/logos/appwrite.svg", 
          title: "Appwrite",
          subtitle: "An open-source backend server that offers APIs for authentication, database, file storage, and more. It simplifies backend development for modern web and mobile apps.",
          link: "https://appwrite.io",
        },
        {
          icon: "https://openai.com/favicon.ico", 
          title: "Fine-Tuned AI Models",
          subtitle: "AI models optimized and customized for specific tasks, enabling high performance in areas like natural language processing, computer vision, and predictive analytics.",
          link: "https://openai.com/research",
        },
      ];
      

  return (
    <section className="relative py-16 overflow-hidden bg-background dark:bg-background  bg-white dark:bg-black ">

        <CosmicBackground />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r bg-clip-text">
          Built on a foundation of fast, production-grade tooling
        </h2>
       
        <div className="relative z-20 flex flex-col md:flex-row justify-center items-center gap-8">
          {toolCards.map((card, index) => (
            <motion.a 
              key={index} 
              href={card.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full max-w-[380px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="w-full h-[250px] flex flex-col justify-between border-border/30 dark:border-border/20 hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <img 
                      src={card.icon} 
                      alt={`${card.title} Logo`} 
                      className="w-12 h-12 mr-4"
                    />
                    <div className="flex items-center">
                      <CardTitle className="mr-2 text-foreground">{card.title}</CardTitle>
                      <ExternalLink 
                        className="text-muted-foreground hover:text-foreground transition-colors" 
                        size={16} 
                      />
                    </div>
                  </div>
                  <CardDescription className="flex items-center">
                    {card.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto relative">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </CardContent>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundationSection;