import React, { createContext, useReducer, useEffect } from 'react';
import { getCharacteristics } from '../hooks/useUserInfo';
import { useAuthContext } from '../hooks/useAuthContext';


export const CharContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { characteristics: action.payload };
    
  case 'LOGOUT':{
    return { characteristics: null};
  }
  default: 
    return state;
  }
};
export const CharContextProvider = ( { children }) => {
  const [state, dispatchChar] = useReducer(authReducer, {
    characteristics: null
  });
  const { user } = useAuthContext();

  if(user){
    const userinfo = JSON.parse(window.localStorage.getItem('userInfo'));
    getCharacteristics(userinfo['userId'], user.token);
  }
  
  useEffect(() => {
    const characteristics = JSON.parse(localStorage.getItem('characteristics'));
    if(characteristics) {
      dispatchChar({type: 'LOGIN', payload: characteristics});
    }
  }, []);

  console.log('CharContext state: ', state);


  return (
    <CharContext.Provider value={{...state, dispatchChar}}>
      { children }
    </CharContext.Provider>
  );

};