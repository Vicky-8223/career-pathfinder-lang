import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";
import { 
  User, 
  GraduationCap, 
  BookOpen, 
  Bell, 
  Calendar,
  Award,
  MapPin,
  Settings,
  LogOut
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { userData, clearUserData } = useUser();

  if (!userData) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    clearUserData();
    navigate('/');
  };

  const getStreamColor = (stream: string) => {
    switch (stream) {
      case 'science':
        return 'bg-education-primary text-white';
      case 'commerce':
        return 'bg-education-secondary text-white';
      case 'arts':
        return 'bg-education-accent text-white';
      default:
        return 'bg-education-primary text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-education-primary/10 via-background to-education-secondary/10">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-education-primary to-education-secondary rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold">{t('dashboard.title')}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t('dashboard.profile')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-gradient-to-r from-education-primary to-education-secondary text-white text-xl">
                      {userData.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{userData.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">Class {userData.class}</Badge>
                      <Badge variant="secondary">
                        {userData.language === 'en' ? 'English' : userData.language === 'hi' ? 'Hindi' : 'Urdu'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Stream */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  {t('dashboard.recommendedStream')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-lg ${getStreamColor(userData.recommendedStream || 'science')}`}>
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {t(`results.${userData.recommendedStream || 'science'}`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`results.${userData.recommendedStream || 'science'}Desc`)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button 
                    onClick={() => navigate('/courses')}
                    className="bg-education-primary hover:bg-education-primary/90 text-white"
                  >
                    View Courses
                  </Button>
                  <Button 
                    onClick={() => navigate('/quiz')}
                    variant="outline"
                  >
                    Retake Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Courses */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {t('dashboard.suggestedCourses')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {userData.recommendedStream === 'science' && (
                    <>
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h4 className="font-semibold">B.Tech Engineering</h4>
                        <p className="text-sm text-muted-foreground">4 Years • High Demand</p>
                      </div>
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h4 className="font-semibold">MBBS Medicine</h4>
                        <p className="text-sm text-muted-foreground">5.5 Years • Excellent Career</p>
                      </div>
                    </>
                  )}
                  {userData.recommendedStream === 'commerce' && (
                    <>
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h4 className="font-semibold">B.Com Commerce</h4>
                        <p className="text-sm text-muted-foreground">3 Years • Versatile</p>
                      </div>
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h4 className="font-semibold">BBA Business</h4>
                        <p className="text-sm text-muted-foreground">3 Years • Leadership</p>
                      </div>
                    </>
                  )}
                  {userData.recommendedStream === 'arts' && (
                    <>
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h4 className="font-semibold">BA Arts</h4>
                        <p className="text-sm text-muted-foreground">3 Years • Creative</p>
                      </div>
                      <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <h4 className="font-semibold">Journalism</h4>
                        <p className="text-sm text-muted-foreground">3 Years • Media</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  {t('dashboard.notifications')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-education-success/10 border border-education-success/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-education-success mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-education-success">
                        {t('dashboard.scholarshipTitle')}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('dashboard.scholarshipDesc')}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-education-primary/10 border border-education-primary/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-education-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-education-primary">
                        {t('dashboard.admissionTitle')}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('dashboard.admissionDesc')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/courses')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Explore Courses
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Colleges
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/quiz')}
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;