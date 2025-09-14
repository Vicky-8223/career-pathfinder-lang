import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, BookOpen, Users, Sparkles, Zap, Target } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-hero animate-gradient-shift">
      <div className="absolute inset-0 bg-black/5" />
      
      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-float mb-8">
            <div className="p-4 bg-gradient-primary rounded-full animate-pulse-glow mx-auto w-fit">
              <GraduationCap className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Career Guidance Platform
            <span className="block text-3xl md:text-5xl mt-4 text-white/80 animate-bounce-soft">
              Shape Your Future
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover your perfect career path with our AI-powered guidance system. 
            Take our smart quiz and unlock personalized recommendations for your future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/auth')}
              variant="rainbow"
              size="lg"
              className="text-lg px-8 py-4"
            >
              <Zap className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 glassmorphism text-white hover:text-primary border-white/30"
            >
              <Target className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-4 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Your Future
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Unlock your potential with our innovative career guidance features
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="card-glow p-8 text-center hover-tilt group">
            <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:animate-bounce-soft">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Smart Quiz</h3>
            <p className="text-white/80 leading-relaxed">
              Answer 10 intelligent questions designed to discover your interests, strengths, and career preferences.
            </p>
          </div>

          <div className="card-glow p-8 text-center hover-tilt group">
            <div className="bg-gradient-secondary p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:animate-bounce-soft">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Stream Recommendation</h3>
            <p className="text-white/80 leading-relaxed">
              Get AI-powered personalized recommendations for Science, Commerce, or Arts streams based on your profile.
            </p>
          </div>

          <div className="card-glow p-8 text-center hover-tilt group">
            <div className="bg-gradient-accent p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:animate-bounce-soft">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">College Info</h3>
            <p className="text-white/80 leading-relaxed">
              Explore comprehensive information about colleges and universities in Jammu & Kashmir with detailed guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
