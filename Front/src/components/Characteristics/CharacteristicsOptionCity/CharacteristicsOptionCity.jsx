import React from 'react';
import styles from './CharacteristicsOptionCity.module.scss';

function CharacteristicOptionCity({name, desc, val, func}){
  return(
    <div className={styles.optionContainer}>
      <label htmlFor={name}>{desc}</label>
      <select required name={name} defaultValue={val} onChange={func}>
        <option value={''}>Wybierz opcje</option>
        <option value={'Gdańsk'}>Gdańsk</option>
        <option value={'Warszawa'}>Warszawa</option>
        <option value={'Toruń'}>Toruń</option>
      </select>
      
    </div>
  );
}

export default CharacteristicOptionCity;