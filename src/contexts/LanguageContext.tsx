import React, { createContext, useContext, useState, ReactNode } from 'react';

// Translation imports
import en from '@/lib/translations/en.json';
import hi from '@/lib/translations/hi.json';
import ur from '@/lib/translations/ur.json';
import ks from '@/lib/translations/ks.json';

export type Language = 'en' | 'hi' | 'ur' | 'ks';

const translations = {
  en,
  hi,
  ur,
  ks,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};