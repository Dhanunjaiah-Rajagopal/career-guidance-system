import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button, RadioGroup, Radio } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Timer, AlertTriangle } from 'lucide-react';
import { 
  APTITUDE_QUESTIONS, 
  DOMAIN_SPECIFIC_QUESTIONS, 
  CURRENT_TRENDS_QUESTIONS, 
  EDUCATION_QUESTIONS 
} from './QuestionDictionary';

interface CareerPreferenceData {
  domain: string;
  education: string;
}

interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

interface QuizSection {
  title: string;
  questions: QuizQuestion[];
  totalScore: number;
}

interface QuizProps {
  onStart: () => void;
  onEnd: () => void;
}

const BuilderQuiz: React.FC<QuizProps> = ({ onStart, onEnd }) => {
  const navigate = useNavigate();
  
  // States for quiz control
  const [showInstructions, setShowInstructions] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(20 * 60); // 20 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  
  // States for quiz data
  const [careerPreferences, setCareerPreferences] = useState<CareerPreferenceData | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: string}>({});
  const [sectionScores, setSectionScores] = useState<number[]>([0, 0, 0, 0]);
  const [completedSections, setCompletedSections] = useState<boolean[]>([false, false, false, false]);
  const [quizSections, setQuizSections] = useState<QuizSection[]>([]);

  // Timer effect with warning
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 300 && prev > 299) { // Show warning at 5 minutes
            setShowTimeWarning(true);
          }
          if (prev <= 1) {
            setTimerActive(false);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerActive, timeRemaining]);

  // Load career preferences
  useEffect(() => {
    const storedPreferences = localStorage.getItem('careerPreferenceData');
    if (storedPreferences) {
      const parsedPreferences = JSON.parse(storedPreferences);
      setCareerPreferences(parsedPreferences);
    }
  }, []);

   // Helper function to randomly select questions
   const getRandomQuestions = (questions: QuizQuestion[], count: number): QuizQuestion[] => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Updated generateQuizSections function with random question selection
  const generateQuizSections = (): QuizSection[] => {
    if (!careerPreferences) return [];

    const QUESTIONS_PER_SECTION = 5;

    return [
      {
        title: 'Aptitude Assessment',
        questions: getRandomQuestions(APTITUDE_QUESTIONS, QUESTIONS_PER_SECTION),
        totalScore: 25
      },
      {
        title: `${careerPreferences.domain} Domain Expertise`,
        questions: getRandomQuestions(
          DOMAIN_SPECIFIC_QUESTIONS[careerPreferences.domain] || [],
          QUESTIONS_PER_SECTION
        ),
        totalScore: 25
      },
      {
        title: 'Current Industry Trends',
        questions: getRandomQuestions(CURRENT_TRENDS_QUESTIONS, QUESTIONS_PER_SECTION),
        totalScore: 25
      },
      {
        title: 'Education and Skill Alignment',
        questions: getRandomQuestions(
          EDUCATION_QUESTIONS[careerPreferences.education],
          QUESTIONS_PER_SECTION
        ),
        totalScore: 25
      }
    ];
  };

  // Initialize quiz sections when preferences load
  useEffect(() => {
    if (careerPreferences) {
      setQuizSections(generateQuizSections());
    }
  }, [careerPreferences]);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle quiz start
  const handleStartQuiz = () => {
    setShowInstructions(false);
    setQuizStarted(true);
    setTimerActive(true);
    onStart();
  };

  // Handle quiz quit
  const handleQuitQuiz = () => {
    onEnd();
    navigate('/');
  };

  // Validate section completion
  const isSectionComplete = (section: QuizSection) => {
    return section.questions.every(q => 
      answers[q.id] !== undefined && answers[q.id] !== ''
    );
  };

  // Calculate section score
  const calculateSectionScore = (section: QuizSection) => {
    return section.questions.reduce((score, question) => {
      return answers[question.id] === question.correctAnswer 
        ? score + 5 
        : score;
    }, 0);
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Handle next question/section
  const handleNextClick = () => {
    const currentSectionObj = quizSections[currentSection];
    
    if (currentQuestionIndex < currentSectionObj.questions.length - 1) {
      const currentQuestion = currentSectionObj.questions[currentQuestionIndex];
      if (!answers[currentQuestion.id]) {
        alert('Please select an answer before proceeding');
        return;
      }
      
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      if (!isSectionComplete(currentSectionObj)) {
        alert('Please answer all questions in the section');
        return;
      }

      const sectionScore = calculateSectionScore(currentSectionObj);
      setSectionScores(prev => {
        const newScores = [...prev];
        newScores[currentSection] = sectionScore;
        return newScores;
      });

      setCompletedSections(prev => {
        const newCompleted = [...prev];
        newCompleted[currentSection] = true;
        return newCompleted;
      });

      if (currentSection < quizSections.length - 1) {
        setCurrentSection(prev => prev + 1);
        setCurrentQuestionIndex(0);
      } else {
        handleSubmit();
      }
    }
  };

  // Handle final submission
  const handleSubmit = () => {
    setTimerActive(false);
    onEnd();
    
    const total = sectionScores.reduce((sum, score) => sum + score, 0);
    const submissionData = {
      sectionScores,
      totalScore: total,
      answers,
      sections: quizSections.map(section => section.title),
      timeRemaining,
      completionTime: 1200 - timeRemaining // Total time taken in seconds
    };

    localStorage.setItem('quizResults', JSON.stringify(submissionData));
    navigate('/quiz-results');
  };

  // Progress calculation
  const calculateProgress = () => {
    const totalQuestions = quizSections.reduce((total, section) => total + section.questions.length, 0);
    const answeredQuestions = Object.keys(answers).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  // Render current question
  const renderCurrentQuestion = () => {
    if (!quizSections.length) return null;

    const section = quizSections[currentSection];
    const question = section.questions[currentQuestionIndex];
    const progress = calculateProgress();
    
    return (
      <div className="max-w-4xl mx-auto my-8 relative">
        {/* Timer Display */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                      bg-primary/10 rounded-lg px-4 py-2 flex items-center gap-2">
          <Timer className={`w-5 h-5 ${timeRemaining <= 300 ? 'text-red-500' : ''}`} />
          <span className={`font-mono text-lg font-bold ${
            timeRemaining <= 300 ? 'text-red-500' : ''
          }`}>
            {formatTime(timeRemaining)}
          </span>
        </div>

        <Card>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <span className="text-sm text-gray-500">
                Progress: {progress}%
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {section.questions.length}
            </p>
          </CardHeader>
          <CardBody>
            <div className="mb-4">
              <p className="mb-4 text-medium">{question.text}</p>
              <RadioGroup
                value={answers[question.id] || ''}
                onValueChange={(value) => handleAnswerSelect(question.id, value)}
                className="space-y-3"
              >
                {question.options.map(option => (
                  <Radio 
                    key={option} 
                    value={option}
                    className="p-2 hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    {option}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <Button 
                color="warning" 
                variant="light"
                onClick={handleQuitQuiz}
              >
                Quit 
              </Button>
              <Button 
                color="primary" 
                onClick={handleNextClick}
                disabled={!answers[question.id]}
              >
                {currentQuestionIndex < section.questions.length - 1 
                  ? 'Next Question' 
                  : (currentSection === quizSections.length - 1 
                      ? 'Submit Quiz' 
                      : 'Next Section')}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  };

  // Show message if no career preferences
  if (!careerPreferences) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-4">
          Please complete the career preferences form first.
        </h2>
        <Button 
          color="primary" 
          onClick={() => navigate('/career-preference')}
        >
          Go to Career Preferences
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Instructions Dialog */}
      <AlertDialog open={showInstructions} onOpenChange={setShowInstructions}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Quiz Instructions & Rules</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>Please read the following instructions carefully before starting the quiz:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The quiz consists of multiple sections testing different aspects of your knowledge.</li>
                <li>You have 20 minutes to complete the entire quiz.</li>
                <li>Each question must be answered before moving to the next one.</li>
                <li>You cannot return to previous questions once answered.</li>
                <li>Each correct answer is worth 5 points.</li>
                <li>The quiz will automatically submit when the timer reaches zero.</li>
                <li>Your progress will be saved for each section.</li>
                <li>Switching tabs or leaving the quiz page is not allowed.</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleQuitQuiz}>Quit</AlertDialogCancel>
            <AlertDialogAction onClick={handleStartQuiz}>Start Quiz</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Time Warning Dialog */}
      <AlertDialog open={showTimeWarning} onOpenChange={setShowTimeWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Time Warning
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have 5 minutes remaining to complete the quiz. Please make sure to finish all remaining questions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowTimeWarning(false)}>
              Continue Quiz
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {quizStarted && renderCurrentQuestion()}
    </div>
  );
};

export default BuilderQuiz;