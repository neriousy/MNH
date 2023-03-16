import React from 'react';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchForm from '../../components/Search/SearchForm/SearchForm';

function Search(){
  return(
    <>
      <main className={styles.main}>
        <div className={styles.cover}>
          <h1>
          Wyszukaj współlokatora 
          </h1>

          <SearchForm/>
        </div>
      </main>
    </>
  );
}

export default Search;