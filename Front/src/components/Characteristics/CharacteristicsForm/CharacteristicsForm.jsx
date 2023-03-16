import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CharacteristicsSlider from '../CharacteristicSlider/CharacteristicsSlider';
import CharacteristicOption from '../CharacteristicsOption/CharacteristicsOption';
import styles from './CharacteristicsForm.module.scss';
import CharacteristicsOptionGender from '../CharacteristicsOptionGender/CharacteristicsOptionGender';
import { useSaveCharacteristics } from '../../../hooks/useSaveCharacteristics';
import CharacteristicOptionCity from '../CharacteristicsOptionCity/CharacteristicsOptionCity';

function CharacteristicsForm({charList}){
  const { saveCharacteristics } = useSaveCharacteristics();
  const[sleepTime, setSleepTime] = useState(charList['sleepTime'] ? charList['sleepTime'] : 3);
  const[cooking, setCooking] = useState(charList['cooking'] ? charList['cooking'] : 3);
  const[invitingFriends, setInvitingFriends] = useState(charList['invitingFriends'] ? charList['invitingFriends'] : 3);
  const[timeSpentOutsideHome, setTimeSpentOutsideHome] = useState(charList['timeSpentOutsideHome'] ? charList['timeSpentOutsideHome'] : 3);
  const[characterType, setCharacterType] = useState(charList['characterType'] ? charList['characterType'] : 3);
  const[talkativity, setTalkativity] = useState(charList['talkative'] ? charList['talkative'] : 3);
  const[conciliatory, setConciliatory] = useState(charList['conciliatory'] ? charList['conciliatory'] : 3);
  const[likesPets, setLikesPets] = useState(charList['likesPets'] ? charList['likesPets'] : 3);
  const[hasPets, setHasPets] = useState(charList['hasPets'] ? charList['hasPets'] : -1);
  const[smokes, setSmokes] = useState(charList['smokes'] ? charList['smokes'] : 3);
  const[drinks, setDrinks] = useState(charList['drinksAlcohol'] ? charList['drinksAlcohol'] : 3);
  const[isStudent, setIsStudent] = useState(charList['isStudent'] ? charList['isStudent'] : -1);
  const[works, setWorks] = useState(charList['works'] ? charList['works'] : -1);
  const[acceptsPets, setAcceptsPets] = useState(charList['acceptsPets'] ? charList['acceptsPets'] : -1);
  const[acceptsSmoking, setAcceptsSmoking] = useState(charList['acceptsSmoking'] ? charList['acceptsSmoking'] : -1);
  const[preferedGender, setPreferedGender] = useState(charList['preferedGender'] ? charList['preferedGender'] : -1);
  const[livesIn, setLivesIn] = useState(charList['livesIn'] ? charList['livesIn'] : -1); 
  const userId = JSON.parse(window.localStorage.getItem('userInfo'))['userId'];
  const token  = JSON.parse(window.localStorage.getItem('user'))['token'];

  const handleSubmit = async(event) =>{
    event.preventDefault();
    saveCharacteristics({acceptsPets, acceptsSmoking, characterType, conciliatory, cooking, drinks, hasPets, invitingFriends, isStudent, likesPets, preferedGender, sleepTime, smokes, talkativity, timeSpentOutsideHome, works, token, userId, livesIn});
  };


  return(
    <form onSubmit={handleSubmit}   className={styles.form}>
      <h4>Cechy Osoby</h4>

      <CharacteristicOptionCity name={'Mieszkam w'} desc={'Mieszkam w'} val={livesIn} func={(e) => setLivesIn(e.target.value)} />

      <span className={styles.description}>
        Zadeklaruj jak bardzo się zgadasz z poniższymi stwierdzeniami
      </span>
      <CharacteristicsSlider name={'Chodze spać wcześnie'} min={1} max={5} val={sleepTime} step={1} func={(e) => {setSleepTime(e.target.value);}}/>
      <CharacteristicsSlider name={'Często gotuję'} min={1} max={5} val={cooking} step={1} func={(e) => {setCooking(e.target.value);}}/>
      <CharacteristicsSlider name={'Często zapraszam znajomych'} min={1} max={5} val={invitingFriends} step={1} func={(e) => {setInvitingFriends(e.target.value);}}/>
      <CharacteristicsSlider name={'Spędzam dużo czasu poza mieszkaniem'} min={1} max={5} val={timeSpentOutsideHome} step={1} func={(e) => {setTimeSpentOutsideHome(e.target.value);}}/>
      <CharacteristicsSlider name={'Jestem introwertykiem'} min={1} max={5} val={characterType} step={1} func={(e) => {setCharacterType(e.target.value);}}/>
      <CharacteristicsSlider name={'Jestem osobą ugodową'} min={1} max={5} val={conciliatory} step={1} func={(e) => {setConciliatory(e.target.value);}}/>
      <CharacteristicsSlider name={'Jestem osobą gadatliwą'} min={1} max={5} val={talkativity} step={1} func={(e) => {setTalkativity(e.target.value);}}/>
      <CharacteristicsSlider name={'Lubię zwierzęta'} min={1} max={5} val={likesPets} step={1} func={(e) => {setLikesPets(e.target.value);}}/>
      <CharacteristicOption name={'Mam zwierzęta'} desc={'Mam zwierzęta'} val={hasPets} func={(e) => {setHasPets(e.target.value);}}/>
      <CharacteristicsSlider name={'Często pale papierosy'} min={1} max={5} val={smokes} step={1} func={(e) => {setSmokes(e.target.value);}}/>
      <CharacteristicsSlider name={'Często spożywam alkohol'} min={1} max={5} val={drinks} step={1} func={(e) => {setDrinks(e.target.value);}}/>
      <CharacteristicOption name={'Jestem studentem'} desc={'Jestem studentem'} val={isStudent} func={(e) => {setIsStudent(e.target.value);}}/>
      <CharacteristicOption name={'Pracuję'} desc={'Pracuję'} val={works} func={(e) => {setWorks(e.target.value);}}/>
      <CharacteristicOption name={'Akceptuje zwierzęta w mieszkaniu'} desc={'Akceptuje zwierzęta w mieszkaniu'} val={acceptsPets}  func={(e) => {setAcceptsPets(e.target.value);}}/>
      <CharacteristicOption name={'Akceptuje palenie papierosów'} desc={'Akceptuje palenie papierosów'} val={acceptsSmoking} func={(e) => {setAcceptsSmoking(e.target.value);}}/>
      <CharacteristicsOptionGender name={'Preferowana płeć współlokator'} desc={'Preferowana płeć współlokatora'} val={preferedGender} func={(e) => {setPreferedGender(e.target.value);}}/>

      <button className={styles.submit} type="submit">ZAPISZ</button>
    </form>
  );
}

export default CharacteristicsForm;

