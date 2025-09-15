import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Quiz = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { userData, updateUserData } = useUser();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(10).fill(-1));

  if (!userData) {
    navigate('/auth');
    return null;
  }

  const questions = [
    {
      question: t('quiz.question1'),
      options: [t('quiz.option1a'), t('quiz.option1b'), t('quiz.option1c'), t('quiz.option1d')]
    },
    {
      question: t('quiz.question2'),
      options: [t('quiz.option2a'), t('quiz.option2b'), t('quiz.option2c'), t('quiz.option2d')]
    },
    {
      question: t('quiz.question3'),
      options: [t('quiz.option3a'), t('quiz.option3b'), t('quiz.option3c'), t('quiz.option3d')]
    },
    {
      question: t('quiz.question4'),
      options: [t('quiz.option4a'), t('quiz.option4b'), t('quiz.option4c'), t('quiz.option4d')]
    },
    {
      question: t('quiz.question5'),
      options: [t('quiz.option5a'), t('quiz.option5b'), t('quiz.option5c'), t('quiz.option5d')]
    },
    {
      question: t('quiz.question6'),
      options: [t('quiz.option6a'), t('quiz.option6b'), t('quiz.option6c'), t('quiz.option6d')]
    },
    {
      question: t('quiz.question7'),
      options: [t('quiz.option7a'), t('quiz.option7b'), t('quiz.option7c'), t('quiz.option7d')]
    },
    {
      question: t('quiz.question8'),
      options: [t('quiz.option8a'), t('quiz.option8b'), t('quiz.option8c'), t('quiz.option8d')]
    },
    {
      question: t('quiz.question9'),
      options: [t('quiz.option9a'), t('quiz.option9b'), t('quiz.option9c'), t('quiz.option9d')]
    },
    {
      question: t('quiz.question10'),
      options: [t('quiz.option10a'), t('quiz.option10b'), t('quiz.option10c'), t('quiz.option10d')]
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, calculate stream recommendation
      const scienceScore = answers.filter((answer, index) => {
        // Simple scoring logic - questions 0, 3, 5, 8 favor science for option 0
        if ([0, 3, 5, 8].includes(index) && answer === 0) return true;
        return false;
      }).length;
      
      const commerceScore = answers.filter((answer, index) => {
        // Questions 1, 4, 6, 9 favor commerce for option 3
        if ([1, 4, 6, 9].includes(index) && answer === 3) return true;
        return false;
      }).length;
      
      const artsScore = answers.filter((answer, index) => {
        // Questions 2, 7 favor arts for option 2
        if ([2, 7].includes(index) && answer === 2) return true;
        return false;
      }).length;
      
      let recommendedStream: 'science' | 'commerce' | 'arts' = 'science';
      
      if (commerceScore >= scienceScore && commerceScore >= artsScore) {
        recommendedStream = 'commerce';
      } else if (artsScore >= scienceScore && artsScore >= commerceScore) {
        recommendedStream = 'arts';
      }

      updateUserData({ 
        quizAnswers: answers,
        recommendedStream
      });
      
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-hero scroll-smooth p-4">
      <div className="container mx-auto max-w-2xl py-8">
        {/* Progress Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-primary smooth-transition">{t('quiz.title')}</h1>
            <span className="text-sm text-muted-foreground smooth-transition">
              {t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-3 smooth-transition" />
        </div>

        {/* Question Card */}
        <Card className="card-professional mb-8 question-transition" key={currentQuestion}>
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-6 text-center animate-slide-up">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-4 rounded-lg border text-left question-transition hover-lift ${
                    answers[currentQuestion] === index
                      ? 'border-primary bg-primary/5 shadow-card'
                      : 'border-border hover:border-primary/50'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="flex items-center gap-3 animate-slide-in">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center smooth-transition ${
                      answers[currentQuestion] === index
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground hover:border-primary'
                    }`}>
                      {answers[currentQuestion] === index && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4 animate-fade-in">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 smooth-transition"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('common.back')}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={answers[currentQuestion] === -1}
            className="flex items-center gap-2 smooth-transition"
          >
            {currentQuestion === questions.length - 1 ? t('common.submit') : t('common.next')}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;