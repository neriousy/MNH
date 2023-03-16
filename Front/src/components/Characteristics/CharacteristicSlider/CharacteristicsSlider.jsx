import React from 'react';
import styles from './CharateristicSlider.module.scss';

function CharacteristicsSlider({min, max, step, name, val, func}){
  return(
    <>
      <div className={styles.sliderContainer}>
        <input className={styles.slider} type="range" name={name} min={min} max={max} defaultValue={val} step={step} onChange={func}/>
        <label htmlFor={name}>{name}</label>
      </div>
    </>
  );
}

export default CharacteristicsSlider;