import { useState } from 'react';
import { getUserInfo } from './useUserInfo';
import { useCharContext } from './useCharContext';

export const useGetCharacteristics = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatchChar } = useCharContext();
  const [status, setStatus] = useState(null);

  const getChars = async (id, token) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/getUserChar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token},
      body: JSON.stringify(id),
      credentials: 'include'
    });

    if(response.status === 204) {
      setIsLoading(false);
      setStatus(204);
    }

    if(response.status === 200) {
      const json = await response.json();
      window.localStorage.setItem('characteristics', JSON.stringify(json));
      dispatchChar({type: 'LOGIN', payload: json});
      setIsLoading(false);
    }
  }; 

  return { getChars, isLoading, error, status };
}; 