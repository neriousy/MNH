import { useAuthContext } from './useAuthContext';
import { useCharContext } from './useCharContext';

export const useLogout = () => {
  const { dispatchAuth } = useAuthContext();
  const { dispatchChar } = useCharContext();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('characteristics');

    dispatchAuth({type: 'LOGOUT'});
    dispatchChar({type: 'LOGOUT'});
  };

  return { logout };
};