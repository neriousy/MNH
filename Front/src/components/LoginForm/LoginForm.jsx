import React, {useState, useEffect} from 'react';
import styles from './LoginForm.module.scss';
import axios, { AxiosError } from 'axios';
import { useLogin } from '../../hooks/useLogin';
import { Button, TextField, Alert, Container, Box } from '@mui/material';

function LoginForm(){
  const[loginData, setLoginData] = useState('');
  const[passwordData, setPasswordData] = useState('');
  const {login, error, isLoading, status} = useLogin();


  const handleSubmit = async(event) =>{
    event.preventDefault();

    await login(loginData, passwordData);
  };

  return(
    
    <form className={styles.form} onSubmit={handleSubmit} method="POST">
      {status !== 200 && status !== null ? <Alert variant="filled" severity="error">{error}</Alert>  : <></>}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <TextField sx={{width: '100%'}} InputProps={{style: {fontSize: '1.4em'}}}  id="email" label="Email" variant='filled' value={loginData} required onChange={(e) => setLoginData(e.target.value)} />
          <TextField type='password'  sx={{width: '100%', mt: 2}} InputProps={{style: {fontSize: '1.4em'}}} id="password" label="Password" variant='filled' value={passwordData} required onChange={(e) => setPasswordData(e.target.value)} />
          <Button fullWidth sx={{ mt: 3, mb: 2 }} variant="contained" type="submit" disabled={isLoading}>Zaloguj</Button>
          
        </Box>
      </Container>
    </form>
  );
}

export default LoginForm;