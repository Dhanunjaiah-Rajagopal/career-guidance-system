import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useCareerGuidelines } from "@/appwrite/api";
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface StreamingTextProps {
  content: string;
}

const StreamingText = ({ content }: StreamingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedText((prev) => prev + content[index]);
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [content]);

  useEffect(() => {
    if (isComplete) {
      // Completion logic if needed
    }
  }, [isComplete]);

  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown>{displayedText}</ReactMarkdown>
      {!isComplete && (
        <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-primary" />
      )}
    </div>
  );
};

const CareerGuidelines = () => {
  const navigate = useNavigate();
  const { guidelines, loading, error } = useCareerGuidelines();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (guidelines) {
      const timer = setTimeout(() => {
        setIsComplete(true);
      }, guidelines.length * 20 + 500);

      return () => clearTimeout(timer);
    }
  }, [guidelines]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        <p className="mt-4 text-muted-foreground">
          Analyzing your profile and generating personalized guidelines...
        </p>
        <Progress value={null} className="max-w-md mt-4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-destructive">Error: {error}</p>
        <Button onClick={() => navigate('/quiz')} className="mt-4">
          Return to Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background/50 dark:bg-background/95">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: isComplete ? 1.02 : 1, 
            opacity: 1,
            y: isComplete ? -10 : 0
          }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 100
          }}
          className="w-full max-w-4xl"
        >
          <Card className="backdrop-blur-lg bg-card/80 dark:bg-card/40 shadow-xl p-6 overflow-y-auto max-h-[80vh] border border-border">
            <h1 className="text-2xl font-bold mb-6 text-center text-foreground">
              Your Personalized Career Path
            </h1>
            
            {guidelines && (
              <div className="space-y-4">
                <StreamingText content={guidelines} />
              </div>
            )}

            <div className="flex justify-center mt-8 gap-4">
              <Button 
                onClick={() => navigate('/quiz')} 
                variant="outline"
                className="border-border hover:bg-accent"
              >
                Retake Quiz
              </Button>
              <Button 
                onClick={() => navigate('/CareerPreference')} 
                variant="secondary"
                className="border-border hover:bg-accent"
              >
                Update Preferences
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CareerGuidelines;