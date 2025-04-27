import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import IUserService from '../services/IUserService';
import { RegisteredUser, TableUser, UserBase } from '../services/User';

export interface ApiContextType {
  getUsers: () => Promise<TableUser[]>;
  deleteUser: (id: string) => Promise<void>;
  createUser(userToBeCreated: UserBase): Promise<RegisteredUser>;
  updateUser(userToBeUpdated: RegisteredUser): Promise<RegisteredUser>;
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
  createUser: async () => {
    throw new Error('Not implemented');
  },
  updateUser: async () => {
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

  const createUser = useCallback(
    async (userToBeCreated: UserBase) => {
      return service.createUser(userToBeCreated);
    },
    [service],
  );

  const updateUser = useCallback(
    async (userToBeUpdated: RegisteredUser) => {
      return service.updateUser(userToBeUpdated);
    },
    [service],
  );

  const contextValue = useMemo(
    () => ({ getUsers, deleteUser, createUser, updateUser }),
    [getUsers, deleteUser, createUser, updateUser],
  );
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
