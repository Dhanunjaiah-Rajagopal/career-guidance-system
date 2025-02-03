
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail 
} from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/yourusername" },
    { icon: Linkedin, href: "https://linkedin.com/in/yourusername" },
    { icon: Twitter, href: "https://twitter.com/yourusername" },
    { icon: Mail, href: "mailto:contact@example.com" }
  ];

  return (
    <footer className="bg-background py-12 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
            Discover opportunities, collaborate, and grow together.
          </p>

          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary 
                  p-3 rounded-full border border-border/50 
                  hover:border-primary/30 
                  transition-all group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon 
                  className="w-6 h-6 group-hover:text-primary transition-colors" 
                />
              </motion.a>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Career PRO. 
            All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;