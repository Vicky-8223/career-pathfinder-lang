import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserData {
  name: string;
  class: '10' | '12';
  language: 'en' | 'hi' | 'ur' | 'ks';
  recommendedStream?: 'science' | 'commerce' | 'arts';
  quizAnswers?: number[];
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserDataState] = useState<UserData | null>(null);

  const setUserData = (data: UserData) => {
    setUserDataState(data);
  };

  const updateUserData = (data: Partial<UserData>) => {
    setUserDataState(prev => prev ? { ...prev, ...data } : null);
  };

  const clearUserData = () => {
    setUserDataState(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, updateUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};