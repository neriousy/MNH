import { useState } from 'react';
import { useAuthContext } from './useAuthContext'; 
import { getCharacteristics, getUserInfo } from './useUserInfo';
import { useCharContext } from './useCharContext';
import { getChars } from './useGetCharacteristics';
import { useGetCharacteristics } from './useGetCharacteristics';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatchAuth } = useAuthContext();
  const [status, setStatus] = useState(null);
  const { getChars } = useGetCharacteristics(); 

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    console.log(JSON.stringify({email, password}));

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
      credentials: 'include'
    });
 
    if(response.status === 423) {
      setIsLoading(false);
      setStatus(423);
      setError('Potwierdz adres email');
      return;
    }

    if(response.status === 403){
      setIsLoading(false);
      setStatus(403);
      setError('Podano nie poprawne dane logowania');
      return;
    }

    if(!response.ok){
      setIsLoading(false);
      setStatus(500);
      setError('Sprobuj ponownie pozniej');
      return;
    }

    if(response.ok) {
      const json = await response.json();
      localStorage.setItem('user', JSON.stringify(json));
      const responseInfo = await fetch(process.env.REACT_APP_API_URL + '/api/v1/userInfo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + json.token},
        body: JSON.stringify(json.token),
        credentials: 'include'
      });
    
      if(responseInfo.ok){
        const jsonInfo = await responseInfo.json();
        window.localStorage.setItem('userInfo', JSON.stringify(jsonInfo));
        const res = await getChars(jsonInfo.userId, json.token);
      }
      dispatchAuth({type: 'LOGIN', payload: json});
      setIsLoading(false);
    }
  }; 

  return { login, isLoading, error, status };
}; 