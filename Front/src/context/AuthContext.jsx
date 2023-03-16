import React, { createContext, useReducer, useEffect } from 'react';
import { getUserInfo } from '../hooks/useUserInfo';
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { user: action.payload };
    
  case 'LOGOUT':{
    return {user: null};
  }
  default: 
    return state;
  }
};
export const AuthContextProvider = ( { children }) => {
  const [state, dispatchAuth] = useReducer(authReducer, {
    user: null,
  });
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) {
      dispatchAuth({type: 'LOGIN', payload: user});
      getUserInfo(user.token);
    }
  }, []);

  console.log('AuthContext state: ', state);


  return (
    <AuthContext.Provider value={{...state, dispatchAuth}}>
      { children }
    </AuthContext.Provider>
  );

};