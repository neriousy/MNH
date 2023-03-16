import { Button } from '@mui/material';
import React from 'react';
import styles from './HomeSlide.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
function HomeSlide(){
  const nav = useNavigate();
  const { user } = useAuthContext();


  const handleClick = () => {
    if(user){
      nav('/search');
      return;
    }
    nav('/register');
  };


  return(
    <section id="home" className={styles.slide}>
      <div className={styles.appHeader}>
        <span className={styles.appName}>My New Homie</span>

        <span className={styles.appDesc}>
          NIE WAŻNE GDZIE, WAŻNE Z KIM
        </span>

        <span className={styles.startNow}>
          <Button fullWidth sx={{ mt: 3, mb: 2 }} variant="contained" type="button" onClick={handleClick}>Zacznij teraz</Button>
        </span>
      </div>
    </section>
  );
}

export default HomeSlide;