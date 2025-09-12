import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";
import { GraduationCap, MapPin, ArrowRight, Book, Briefcase, Palette } from "lucide-react";

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

  const colleges = [
    { name: t('courses.colleges.college1'), location: 'Delhi', type: 'Engineering' },
    { name: t('courses.colleges.college2'), location: 'Mumbai', type: 'Medical' },
    { name: t('courses.colleges.college3'), location: 'Delhi', type: 'General' }
  ];

  const courses = getStreamCourses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-education-primary/10 via-background to-education-secondary/10 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('courses.title')}</h1>
          <Badge variant="secondary" className="mb-4">
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
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-education-primary/10 rounded-lg text-education-primary">
                      {course.icon}
                    </div>
                    <Badge variant="outline">{course.duration}</Badge>
                  </div>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    A comprehensive program designed to build strong foundation and practical skills in your chosen field.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-education-success font-medium">
                      High Demand
                    </span>
                    <Button variant="ghost" size="sm">
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
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-education-secondary/10 rounded-lg">
                        <GraduationCap className="h-6 w-6 text-education-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{college.name}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {college.location}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {college.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-education-secondary hover:bg-education-secondary/90 text-white">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="bg-gradient-to-r from-education-primary to-education-secondary hover:from-education-primary/90 hover:to-education-secondary/90 text-white"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          
          <Button
            onClick={() => navigate('/results')}
            variant="outline"
            size="lg"
          >
            Back to Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Courses;