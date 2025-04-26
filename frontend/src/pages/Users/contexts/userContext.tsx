import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import IUserService from '../services/IUserService';
import { TableUser } from '../services/User';

export interface ApiContextType {
  getUsers: () => Promise<TableUser[]>;
  deleteUser: (id: string) => Promise<void>;
}

interface ApiProviderProps {
  service: IUserService;
  children: ReactNode;
}

export const UserContext = createContext<ApiContextType>({
  getUsers: async () => {
    throw new Error('Not implemented');
  },
  deleteUser: async () => {
    throw new Error('Not implemented');
  },
});

export const UserProvider: React.FC<ApiProviderProps> = ({
  service,
  children,
}) => {
  const getUsers = useCallback(async () => {
    return service.getUsers();
  }, [service]);

  const deleteUser = useCallback(
    async (id: string) => {
      return service.deleteUser(id);
    },
    [service],
  );

  const contextValue = useMemo(
    () => ({ getUsers, deleteUser }),
    [getUsers, deleteUser],
  );
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
