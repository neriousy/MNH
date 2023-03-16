import React from 'react';
import styles from './SearchResultGrid.module.scss';
import tempProfile from '../../../../assets/temp-profile.png';
import { Avatar } from '@mui/material';

function SearchResultGrid({data}){


  return(
    <div className={styles.resultContainer}>
      <Avatar sx={{marginTop: 3, width: '50%', height: 'auto'}} src={tempProfile} alt='Profile picture'/>

      <div className={styles.information}>
        <span className={styles.name}>{data.firstname}, {data.age}</span>
        <span className={styles.desc}>Student</span>
        <span className={styles.desc}></span>
      </div>
    </div>
  );
}

export default SearchResultGrid;