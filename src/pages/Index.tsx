import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, BookOpen, Users, Sparkles, Zap, Target } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-hero scroll-smooth">
      <div className="absolute inset-0 bg-black/5" />
      
      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="p-4 bg-primary rounded-full mx-auto w-fit smooth-transition hover-scale">
              <GraduationCap className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 animate-slide-up">
            Career Guidance Platform
            <span className="block text-3xl md:text-5xl mt-4 text-foreground">
              Shape Your Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-in" style={{ animationDelay: '200ms' }}>
            Discover your perfect career path with our AI-powered guidance system. 
            Take our smart quiz and unlock personalized recommendations for your future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-in" style={{ animationDelay: '400ms' }}>
            <Button 
              onClick={() => navigate('/auth')}
              size="lg"
              className="text-lg px-10 py-5 smooth-transition hover-scale"
            >
              <Zap className="w-6 h-6 mr-3" />
              Get Started
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="text-lg px-10 py-5 smooth-transition hover-scale"
            >
              <Target className="w-6 h-6 mr-3" />
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-4 pb-20">
        <div className="text-center mb-16 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Discover Your Future
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock your potential with our innovative career guidance features
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="card-professional p-8 text-center hover-lift animate-slide-up" style={{ animationDelay: '700ms' }}>
            <div className="bg-primary p-4 rounded-full w-20 h-20 mx-auto mb-6 smooth-transition hover-scale">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Smart Quiz</h3>
            <p className="text-muted-foreground leading-relaxed">
              Answer 10 intelligent questions designed to discover your interests, strengths, and career preferences.
            </p>
          </div>

          <div className="card-professional p-8 text-center hover-lift animate-slide-up" style={{ animationDelay: '800ms' }}>
            <div className="bg-primary p-4 rounded-full w-20 h-20 mx-auto mb-6 smooth-transition hover-scale">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Stream Recommendation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get AI-powered personalized recommendations for Science, Commerce, or Arts streams based on your profile.
            </p>
          </div>

          <div className="card-professional p-8 text-center hover-lift animate-slide-up" style={{ animationDelay: '900ms' }}>
            <div className="bg-primary p-4 rounded-full w-20 h-20 mx-auto mb-6 smooth-transition hover-scale">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">College Info</h3>
            <p className="text-muted-foreground leading-relaxed">
              Explore comprehensive information about colleges and universities in Jammu & Kashmir with detailed guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
