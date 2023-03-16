import React, { useEffect} from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './Login.module.scss';
import { NavLink } from 'react-router-dom';

function Login(){
  return(
    <>
      <main className={styles.main}>
        <LoginForm/>
        
        <span className={styles.toRegister}>Nie masz konta? <NavLink to='/register'>Zarejestruj się</NavLink></span>
      </main>
    </>
  );
}

export default Login;