import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";
import { GraduationCap, BookOpen, Briefcase, Palette, ArrowRight } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { userData } = useUser();

  if (!userData || !userData.recommendedStream) {
    navigate('/auth');
    return null;
  }

  const getStreamIcon = (stream: string) => {
    switch (stream) {
      case 'science':
        return <GraduationCap className="h-12 w-12 text-education-primary" />;
      case 'commerce':
        return <Briefcase className="h-12 w-12 text-education-secondary" />;
      case 'arts':
        return <Palette className="h-12 w-12 text-education-accent" />;
      default:
        return <BookOpen className="h-12 w-12 text-education-primary" />;
    }
  };

  const getStreamColor = (stream: string) => {
    switch (stream) {
      case 'science':
        return 'from-education-primary to-blue-600';
      case 'commerce':
        return 'from-education-secondary to-green-600';
      case 'arts':
        return 'from-education-accent to-orange-600';
      default:
        return 'from-education-primary to-blue-600';
    }
  };

  const streamTitle = t(`results.${userData.recommendedStream}`);
  const streamDescription = t(`results.${userData.recommendedStream}Desc`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-education-primary/10 via-background to-education-secondary/10 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('results.title')}</h1>
          <p className="text-lg text-muted-foreground">{t('results.recommendation')}</p>
        </div>

        {/* Recommendation Card */}
        <Card className="shadow-xl mb-8 overflow-hidden">
          <div className={`bg-gradient-to-r ${getStreamColor(userData.recommendedStream)} p-6`}>
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                {getStreamIcon(userData.recommendedStream)}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              {streamTitle}
            </h2>
          </div>
          
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground text-lg mb-6">
              {streamDescription}
            </p>
            
            {/* Success Message */}
            <div className="bg-education-success/10 border border-education-success/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-education-success/20 rounded-full">
                  <GraduationCap className="h-5 w-5 text-education-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-education-success">Congratulations!</h3>
                  <p className="text-sm text-muted-foreground">
                    You've completed the career guidance quiz successfully.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold text-center">What's Next?</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <BookOpen className="h-5 w-5 text-education-primary" />
                  <span className="text-sm">Explore recommended courses</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <GraduationCap className="h-5 w-5 text-education-secondary" />
                  <span className="text-sm">Find nearby government colleges</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Briefcase className="h-5 w-5 text-education-accent" />
                  <span className="text-sm">Access your personalized dashboard</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => navigate('/courses')}
            size="lg"
            className="bg-gradient-to-r from-education-primary to-education-secondary hover:from-education-primary/90 hover:to-education-secondary/90 text-white flex items-center gap-2"
          >
            {t('results.viewCourses')}
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;