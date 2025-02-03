import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { ChartPieIcon, TrophyIcon, ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { Progress } from "@/components/ui/progress";

interface QuizResult {
  sectionScores: number[];
  totalScore: number;
  answers: {[key: string]: string};
  sections: string[];
}

export default function QuizResults() {
  const navigate = useNavigate();
  const [quizResults, setQuizResults] = useState<QuizResult | null>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem('quizResults');
    if (storedResults) {
      setQuizResults(JSON.parse(storedResults));
    } else {
      navigate('/quiz');
    }
  }, [navigate]);

  if (!quizResults) return null;

  const pieChartData = quizResults.sections.map((section, index) => ({
    name: section,
    value: quizResults.sectionScores[index]
  }));

  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))'
  ];

  const getPerformanceLabel = (score: number) => {
    if (score >= 90) return 'Outstanding';
    if (score >= 75) return 'Excellent';
    if (score >= 60) return 'Proficient';
    if (score >= 50) return 'Satisfactory';
    return 'Developing';
  };

  return (
    <div className="container mx-auto p-12">
      <Card className="max-w-5xl mx-auto my-8 p-6 bg-gradient-to-br from-background/50 to-muted/30 backdrop-blur-sm border border-border/50">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-primary/10 rounded-lg">
              <TrophyIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Quiz Results</h1>
              <p className="text-muted-foreground">Performance Analysis Dashboard</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Pie Chart Section */}
            <div className="lg:col-span-3">
              <Card className="h-full bg-card/50 hover:bg-card/70 backdrop-blur-sm shadow-lg transition-all duration-300 border border-border/50">
                <CardContent className="p-6">
                  <div className="h-[400px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={8}
                          dataKey="value"
                          startAngle={90}
                          endAngle={450}
                        >
                          {pieChartData.map((_entry, index) => (
                            <Cell 
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                              className="hover:opacity-90 transition-opacity cursor-pointer"
                              stroke="hsl(var(--background))"
                              strokeWidth={2}
                            />
                          ))}
                          <Label
                            content={({ viewBox }) => {
                              if (!viewBox) return null;
                              const { cx, cy } = viewBox as { cx: number; cy: number };
                              return (
                                <g>
                                  <text
                                    x={cx}
                                    y={cy - 10}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    style={{
                                      fill: 'hsl(var(--foreground))',
                                      fontSize: '2rem',
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    {quizResults.totalScore}%
                                  </text>
                                  <text
                                    x={cx}
                                    y={cy + 20}
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    style={{
                                      fill: 'hsl(var(--muted-foreground))',
                                      fontSize: '0.875rem'
                                    }}
                                  >
                                    Total Score
                                  </text>
                                </g>
                              );
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side Sections */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Card */}
              <Card className="bg-card/50 hover:bg-card/70 backdrop-blur-sm shadow-lg transition-all duration-300 border border-border/50">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4">
                    <ChartPieIcon className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-semibold text-center text-foreground">
                      {getPerformanceLabel(quizResults.totalScore)}
                    </h2>
                    <div className="flex items-center gap-2 text-primary">
                      <ArrowUpIcon className="h-5 w-5" />
                      <span className="font-medium">Performance Rating</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section Scores */}
              <Card className="bg-card/50 hover:bg-card/70 backdrop-blur-sm shadow-lg transition-all duration-300 border border-border/50">
                <CardContent className="p-6 space-y-4">
                  {quizResults.sections.map((section, index) => (
                    <div key={section} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="font-medium text-foreground">{section}</span>
                        </div>
                        <span className="text-muted-foreground">
                          {quizResults.sectionScores[index]}%
                        </span>
                      </div>
                      <Progress 
                        value={quizResults.sectionScores[index]} 
                        className="h-2 bg-muted"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button 
              variant="outline" 
              className="flex-1 text-base hover:bg-muted"
              onClick={() => navigate('/quiz')}
            >
              Retake Quiz
            </Button>
            <Button 
              className="flex-1 text-base bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => navigate('/career-guidelines')}
            >
              View Guidelines
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}