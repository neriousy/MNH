import { useState } from 'react';
import { getUserInfo } from './useUserInfo';
import { useCharContext } from './useCharContext';
import { useGetCharacteristics } from './useGetCharacteristics';

export const useSaveCharacteristics = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatchChar } = useCharContext();
  const [status, setStatus] = useState(null);
  const { getChars } = useGetCharacteristics();

  const saveCharacteristics = async ({acceptsPets, acceptsSmoking, characterType, conciliatory, cooking, drinks, hasPets, invitingFriends, isStudent, likesPets, preferedGender, sleepTime, smokes, talkativity, timeSpentOutsideHome, works, token, userId, livesIn}) =>{
    works = parseInt(works);
    isStudent = parseInt(isStudent);
    hasPets = parseInt(hasPets);
    acceptsPets = parseInt(acceptsPets);
    acceptsSmoking = parseInt(acceptsSmoking);

    setIsLoading(true);
    setError(null);
    
    const response = await fetch(process.env.REACT_APP_API_URL + '/api/v1/saveUserChar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token},
      body: JSON.stringify({acceptsPets, acceptsSmoking, characterType, conciliatory, cooking, drinks, hasPets, invitingFriends, isStudent, likesPets, preferedGender, sleepTime, smokes, talkativity, timeSpentOutsideHome, works, userId, livesIn}),
      credentials: 'include'
    });

    if(response.status === 200) {
      getChars(userId, token);
      setIsLoading(false);
    }
  }; 

  return { saveCharacteristics, isLoading, error, status };
}; 