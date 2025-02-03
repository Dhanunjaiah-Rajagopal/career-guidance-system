import { useEffect, useState } from 'react';
import BuilderQuiz from "@/components/Quiz/Quiz";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const navigate = useNavigate();
  const [showTabWarning, setShowTabWarning] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  // Handle tab visibility and counting
  useEffect(() => {
    if (!isQuizActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            navigate('/');
            return prev;
          }
          setShowTabWarning(true);
          return newCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isQuizActive, navigate]);

  // Handle text selection prevention and fullscreen
  useEffect(() => {
    if (!isQuizActive) return;

    // Prevent text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.userSelect = 'none';
    document.body.style.userSelect = 'none';

    // Request fullscreen
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.requestFullscreen) {
      element.requestFullscreen();
    }

    // Cleanup function
    return () => {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.userSelect = '';
      document.body.style.userSelect = '';
      
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, [isQuizActive]);

  // Prevent keyboard shortcuts and right-click
  useEffect(() => {
    if (!isQuizActive) return;

    const preventDefaultBehavior = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'p')) ||
        (e.key === 'F12') ||
        (e.altKey && e.key === 'Tab')
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', preventDefaultBehavior);
    document.addEventListener('keydown', preventKeyboardShortcuts);
    
    return () => {
      document.removeEventListener('contextmenu', preventDefaultBehavior);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
    };
  }, [isQuizActive]);

  const handleQuizStart = () => {
    setIsQuizActive(true);
    setTabSwitchCount(0);
  };

  const handleQuizEnd = () => {
    setIsQuizActive(false);
    setTabSwitchCount(0);
  };

  const handleTabWarningClose = () => {
    setShowTabWarning(false);
  };

  const handleQuit = () => {
    navigate('/');
  };

  return (
    <div 
      className={`min-h-screen bg-gradient-to-b from-background to-background/50
        ${isQuizActive ? 'fixed inset-0 z-50 flex items-center justify-center' : 'py-16 px-4'}`}
    >
      <div 
        className={`${isQuizActive 
          ? 'w-full max-w-7xl mx-auto px-6 flex items-center justify-center h-screen' 
          : 'max-w-6xl mx-auto'}`}
      >
        {/* Quiz Container */}
        <div 
          className={`bg-card shadow-xl transition-all duration-300 ease-in-out
            ${isQuizActive 
              ? 'w-full h-auto max-h-[90vh] overflow-y-auto rounded-xl border-2 border-primary/20 p-8 backdrop-blur-sm bg-card/95' 
              : 'rounded-lg border border-border p-8'}`}
        >
          <BuilderQuiz 
            onStart={handleQuizStart} 
            onEnd={handleQuizEnd}
          />
        </div>

        {/* Tab Warning Dialog */}
        <AlertDialog open={showTabWarning} onOpenChange={setShowTabWarning}>
          <AlertDialogContent className="max-w-md bg-card border-border">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-destructive font-semibold">
                Warning: Tab Switching Detected ({tabSwitchCount}/3)
              </AlertDialogTitle>
              <AlertDialogDescription className="text-card-foreground/80">
                Tab switching is not allowed during the quiz. You have {3 - tabSwitchCount} attempts remaining before automatic quiz termination.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="space-x-2">
              <AlertDialogCancel 
                onClick={handleQuit}
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              >
                Quit Quiz
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleTabWarningClose}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Continue Quiz
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default QuizPage;