import React from 'react';
import styles from './CharacteristicsOption.module.scss';

function CharacteristicsOption({name, desc, val, func}){
  return(
    <div className={styles.optionContainer}>
      <select required name={name} defaultValue={val} onChange={func}>
        <option value={-1}>Wybierz opcje</option>
        <option value={0}>Nie</option>
        <option value={1}>Tak</option>
      </select>
      <label htmlFor={name}>{desc}</label>
    </div>
  );
}

export default CharacteristicsOption;