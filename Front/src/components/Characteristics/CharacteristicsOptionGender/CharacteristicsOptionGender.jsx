import React from 'react';
import styles from './CharacteristicsOptionGender.module.scss';

function CharacteristicsOptionGender({name, desc, val, func}){
  return(
    <div className={styles.optionContainer}>
      <select name={name} defaultValue={val} onChange={func}>
        <option value={-1}>Wybierz opcje</option>
        <option value={'Male'}>Mężczyzna</option>
        <option value={'Female'}>Kobieta</option>
        <option value={'Other'}>Inna</option>
      </select>
      <label htmlFor={name}>{desc}</label>
    </div>
  );
}

export default CharacteristicsOptionGender;