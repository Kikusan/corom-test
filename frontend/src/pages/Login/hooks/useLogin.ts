import { ApiContextType, LoginContext } from '../contexts/loginContext';

import { useContext } from 'react';


export const UseLogin = (): ApiContextType => {
    return useContext(LoginContext);
};