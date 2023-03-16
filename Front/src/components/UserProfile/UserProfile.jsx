import React, { useEffect, useState } from 'react';
import Styles from './UserProfile.module.scss';
import axios from 'axios';


function UserProfile({userInfo}) {

  return (
    <>
      <section className={Styles.profile}>
        <div className={Styles.userProfile}>
          <div className={Styles.photo}><img src="https://www.tutorialspoint.com/assets/questions/media/426142-1668760872.png" alt="User photo" /></div>
          <div className={Styles.titles}>
            <span>Imię i nazwisko: </span>
            <span>Email: </span>
            <span>Wiek: </span>
            <span>Płeć: </span>
            <span>Numer telefonu: </span>
          </div>
          <div className={Styles.userInfo}>
            <span className={Styles.name}>Bartosz Konkel</span>
            <span className={Styles.email}>sda@gmail.com</span>
            <span className={Styles.age}>15</span>
            <span className={Styles.gender}>Mezczyzna</span>
            <span className={Styles.phoneNumber}>123456789</span>
          </div>
        </div>
      </section>
    </>
  );
  
}
  
export default UserProfile;
