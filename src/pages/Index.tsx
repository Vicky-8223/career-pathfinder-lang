import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, BookOpen, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-education-primary/10 via-background to-education-secondary/10">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-education-primary to-education-secondary rounded-full">
              <GraduationCap className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
            Career Guidance Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover your perfect career path with our intelligent guidance system. 
            Take a quick quiz and get personalized recommendations for your future.
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            size="lg"
            className="bg-gradient-to-r from-education-primary to-education-secondary hover:from-education-primary/90 hover:to-education-secondary/90 text-white px-8 py-4 text-lg"
          >
            Get Started
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-education-primary/10 rounded-full w-fit mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-education-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Quiz</h3>
            <p className="text-muted-foreground">Answer 10 simple questions to discover your interests and strengths</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-education-secondary/10 rounded-full w-fit mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-education-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Stream Recommendation</h3>
            <p className="text-muted-foreground">Get personalized suggestions for Science, Commerce, or Arts</p>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-education-accent/10 rounded-full w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-education-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">College Info</h3>
            <p className="text-muted-foreground">Explore courses and nearby government colleges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
