import React from 'react';
import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

function Navbar(){
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () =>{
    logout();
  };


  return(
    <header className={styles.header}>
      <nav>
        <ul className={styles.navUl}>
          <li>
            <NavLink to='/' className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
          </li>

          {user
            ? <li><NavLink to='/search' className={({ isActive }) => isActive ? styles.active : ''}>Wyszukiwarka</NavLink></li>
            : <></>
          }


          {user
            ? <li><NavLink to='/myProfile' className={({ isActive }) => isActive ? styles.active : ''}>Mój profil</NavLink></li>
            : <></>
          }

          {user
            ? <li><NavLink to='/characteristics' className={({ isActive }) => isActive ? styles.active : ''}>Cechy</NavLink></li>
            : <></>
          }

          {!user
            ?  <li><NavLink to='/login' className={({ isActive }) => isActive ? styles.active : ''}>Zaloguj sie</NavLink></li>
            :  <li><a onClick={handleLogout}>Wyloguj sie</a></li>

          }
          
        </ul>
      </nav>
    </header>
  );

}

export default Navbar;