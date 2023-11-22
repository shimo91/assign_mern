import { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [sessionValue, setSessionValue] = useState('');

  const updateSessionValue = (newValue) => {
    setSessionValue(newValue);
    sessionStorage.setItem('myKey', newValue);
  };

  return (
    <SessionContext.Provider value={{ sessionValue, updateSessionValue }}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export { SessionProvider, useSession };
