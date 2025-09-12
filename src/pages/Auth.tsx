import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useUser } from "@/contexts/UserContext";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { setUserData } = useUser();
  
  const [formData, setFormData] = useState({
    name: "",
    class: "" as "10" | "12" | "",
    selectedLanguage: language
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.class) {
      toast.error("Please fill in all fields");
      return;
    }

    setLanguage(formData.selectedLanguage);
    
    setUserData({
      name: formData.name,
      class: formData.class,
      language: formData.selectedLanguage
    });
    
    toast.success("Welcome! Let's start your career journey");
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-education-primary/10 via-background to-education-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-education-primary to-education-secondary rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-education-primary to-education-secondary bg-clip-text text-transparent">
            {t('auth.welcome')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('auth.enterName')}</label>
              <Input
                type="text"
                placeholder={t('common.name')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('auth.selectClass')}</label>
              <Select onValueChange={(value: "10" | "12") => setFormData({ ...formData, class: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('common.class')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">{t('auth.class10')}</SelectItem>
                  <SelectItem value="12">{t('auth.class12')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('auth.selectLanguage')}</label>
              <Select onValueChange={(value: Language) => setFormData({ ...formData, selectedLanguage: value })} defaultValue={language}>
                <SelectTrigger>
                  <SelectValue placeholder={t('common.language')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('auth.english')}</SelectItem>
                  <SelectItem value="hi">{t('auth.hindi')}</SelectItem>
                  <SelectItem value="ur">{t('auth.urdu')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-education-primary to-education-secondary hover:from-education-primary/90 hover:to-education-secondary/90 text-white"
              size="lg"
            >
              {t('auth.getStarted')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;