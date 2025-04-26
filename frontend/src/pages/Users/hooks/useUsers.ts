import { ApiContextType, UserContext } from '../contexts/userContext';

import { useContext } from 'react';


export const UseUser = (): ApiContextType => {
    return useContext(UserContext);
};