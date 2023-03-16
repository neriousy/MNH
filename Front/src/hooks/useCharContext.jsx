import { CharContext } from '../context/CharContext';
import { useContext } from 'react';

export const useCharContext = () =>{
  const context = useContext(CharContext);

  if(!context) {
    throw Error('useCharContext must be inside an CharContextProvider');
  }

  return context;
};