import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import ILoginService from '../services/ILoginService';

export interface ApiContextType {
  login(username: string, password: string): Promise<string>;
}

interface ApiProviderProps {
  service: ILoginService;
  children: ReactNode;
}

export const LoginContext = createContext<ApiContextType>({
  login: async () => {
    throw new Error('Not implemented');
  },
});

export const LoginProvider: React.FC<ApiProviderProps> = ({
  service,
  children,
}) => {
  const login = useCallback(
    async (username: string, password: string) => {
      return service.login(username, password);
    },
    [service],
  );

  const contextValue = useMemo(() => ({ login }), [login]);
  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};
