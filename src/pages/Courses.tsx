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
    <div className="min-h-screen bg-gradient-hero scroll-smooth p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-4 text-primary">{t('courses.title')}</h1>
          <Badge variant="secondary" className="mb-4 smooth-transition hover-scale">
            Recommended for {t(`results.${userData.recommendedStream}`)}
          </Badge>
        </div>

        {/* Degree Options Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 animate-slide-in">
            <Book className="h-6 w-6 text-primary" />
            {t('courses.degreeOptions')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="card-professional hover-lift animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-primary rounded-lg text-white smooth-transition hover-scale">
                      {course.icon}
                    </div>
                    <Badge variant="outline" className="smooth-transition hover-scale">{course.duration}</Badge>
                  </div>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    A comprehensive program designed to build strong foundation and practical skills in your chosen field.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-primary font-medium">
                      High Demand
                    </span>
                    <Button variant="ghost" size="sm" className="smooth-transition hover-scale">
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
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 animate-slide-in" style={{ animationDelay: '400ms' }}>
            <MapPin className="h-6 w-6 text-primary" />
            {t('courses.nearbyColleges')}
          </h2>
          
          <div className="space-y-4">
            {colleges.map((college, index) => (
              <Card key={index} className="card-professional hover-lift animate-slide-up" style={{ animationDelay: `${(index + 3) * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-primary rounded-lg smooth-transition hover-scale">
                        <GraduationCap className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{college.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {college.location}
                          </div>
                          <Badge variant="secondary" className="text-xs smooth-transition hover-scale">
                            {college.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="smooth-transition hover-scale">
                        View Details
                      </Button>
                      <Button size="sm" className="smooth-transition hover-scale">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '800ms' }}>
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="smooth-transition hover-scale"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          
          <Button
            onClick={() => navigate('/results')}
            variant="outline"
            size="lg"
            className="smooth-transition hover-scale"
          >
            Back to Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Courses;