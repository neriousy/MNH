import React, { useEffect, useState } from 'react';
import Styles from './UserSpecific.module.scss';




function UserSpecific() {

  return (
    <>
      <section className={Styles.profile}>
        <div className={Styles.userProfile}>
          <div className={Styles.titles}>
            <span>Charakter 1: </span>
            <span>Charakter 2: </span>
            <span>Charakter 3: </span>
            <span>Charakter 4: </span>
            <span>Charakter 5: </span>
            <span>Charakter 6: </span>
          </div>
          <div className={Styles.characteristics}>
            
          </div>
        </div>
      </section>
    </>
  );
  
}
  
export default UserSpecific;
