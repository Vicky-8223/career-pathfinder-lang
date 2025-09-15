import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";
import { GraduationCap, MapPin, ArrowRight, Book, Briefcase, Palette } from "lucide-react";
import { getCollegesByStream } from "@/data/collegesJK";

const Courses = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { userData } = useUser();

  if (!userData || !userData.recommendedStream) {
    navigate('/auth');
    return null;
  }

  const getStreamCourses = () => {
    switch (userData.recommendedStream) {
      case 'science':
        return [
          { name: t('courses.scienceCourses.engineering'), duration: '4 Years', icon: <GraduationCap className="h-5 w-5" /> },
          { name: t('courses.scienceCourses.medical'), duration: '5.5 Years', icon: <Book className="h-5 w-5" /> },
          { name: t('courses.scienceCourses.science'), duration: '3 Years', icon: <GraduationCap className="h-5 w-5" /> }
        ];
      case 'commerce':
        return [
          { name: t('courses.commerceCourses.bcom'), duration: '3 Years', icon: <Briefcase className="h-5 w-5" /> },
          { name: t('courses.commerceCourses.bba'), duration: '3 Years', icon: <Briefcase className="h-5 w-5" /> },
          { name: t('courses.commerceCourses.ca'), duration: '4-5 Years', icon: <Book className="h-5 w-5" /> }
        ];
      case 'arts':
        return [
          { name: t('courses.artsCourses.ba'), duration: '3 Years', icon: <Palette className="h-5 w-5" /> },
          { name: t('courses.artsCourses.journalism'), duration: '3 Years', icon: <Book className="h-5 w-5" /> },
          { name: t('courses.artsCourses.law'), duration: '5 Years', icon: <GraduationCap className="h-5 w-5" /> }
        ];
      default:
        return [];
    }
  };

  // Get J&K colleges based on recommended stream
  const streamColleges = getCollegesByStream(userData.recommendedStream);
  
  const colleges = streamColleges.slice(0, 3).map(college => ({
    name: college.name,
    location: college.district,
    type: college.type.replace('Affiliated College', 'Affiliated').replace('Constituent / University College', 'University'),
    university: college.universityName,
    courses: college.courses?.slice(0, 2) || []
  }));

  const courses = getStreamCourses();

  return (
    <div className="min-h-screen bg-gradient-hero animate-gradient-shift p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-4 glow-text animate-bounce-soft">{t('courses.title')}</h1>
          <Badge variant="secondary" className="mb-4 hover:scale-110 transition-all duration-300 animate-pulse-glow">
            Recommended for {t(`results.${userData.recommendedStream}`)}
          </Badge>
        </div>

        {/* Degree Options Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Book className="h-6 w-6 text-education-primary" />
            {t('courses.degreeOptions')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="shadow-elevated hover-float group transform transition-all duration-700 hover:rotate-1 animate-fade-in">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-gradient-primary rounded-lg text-white group-hover:animate-pulse-glow transition-all duration-500 group-hover:scale-125">
                      {course.icon}
                    </div>
                    <Badge variant="outline" className="group-hover:scale-110 transition-all duration-300">{course.duration}</Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:scale-105 transition-transform duration-300 glow-text">{course.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/70 mb-4 group-hover:text-white transition-colors duration-300">
                    A comprehensive program designed to build strong foundation and practical skills in your chosen field.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-accent-green font-medium group-hover:scale-105 transition-transform duration-300">
                      High Demand
                    </span>
                    <Button variant="ghost" size="sm" className="hover:scale-110 transition-all duration-300">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nearby Colleges Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-education-secondary" />
            {t('courses.nearbyColleges')}
          </h2>
          
          <div className="space-y-4">
            {colleges.map((college, index) => (
              <Card key={index} className="shadow-elevated hover-lift group transform transition-all duration-500 hover:rotate-1 animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gradient-secondary rounded-lg group-hover:animate-pulse-glow transition-all duration-500 group-hover:scale-125">
                        <GraduationCap className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg glow-text group-hover:scale-105 transition-transform duration-300">{college.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                            <MapPin className="h-4 w-4" />
                            {college.location}
                          </div>
                          <Badge variant="secondary" className="text-xs group-hover:scale-110 transition-all duration-300">
                            {college.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="glassmorphism text-white hover:text-primary border-white/30 hover:scale-105 transition-all duration-300">
                        View Details
                      </Button>
                      <Button size="sm" variant="secondary" className="hover:scale-110 transition-all duration-300">
                        Apply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            variant="rainbow"
            className="text-white hover:scale-110 hover:rotate-1 transition-all duration-500 animate-pulse-glow"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          
          <Button
            onClick={() => navigate('/results')}
            variant="outline"
            size="lg"
            className="glassmorphism text-white hover:text-primary border-white/30 hover:scale-105 transition-all duration-300"
          >
            Back to Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Courses;