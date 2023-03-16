import React, {useEffect, useState} from 'react';
import styles from './MyProfileForm.module.scss';
import temp from './../../assets/temp-profile.png';
import axios from 'axios';
import { saveUserInfo } from '../../hooks/useUserInfo';
import { Grid, TextField, Container, Box, MenuItem, Avatar,Typography, Select, Button, Alert } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


function MyProfileForm({data}){
  const[firstname, setFirstname] = useState('');
  const[lastname, setLastname] = useState('');
  const[username, setEmail] = useState('');
  const[age, setAge] = useState('');
  const[gender, setGender] = useState('');
  const[phonenumber, setPhonenumber] = useState('');
  const[status, setStatus] = useState(0);

  const prevalidateName = (e) => {
    const re = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setFirstname(e.target.value);
    }
  };

  const prevalidateLastname = (e) => {
    const re = /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setLastname(e.target.value);
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9.! #$%&'*+-/=? ^_`{|}~]*@[a-zA-Z.0-9-]*\.[a-zA-Z]{2,}$/;
    if (re.test(email)) {
      return true;
    }
    return false;
  };

  const validatePhone = (phone) => {
    const re = /^[1-9]{1}[0-9]{8}$/;
    if (re.test(phone)) {
      return true;
    }
    return false;
  };



  const prevalidateAge = (e) => {
    const re = /^[1-9][0-9]*$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setAge(e.target.value);
    }
  };

  const prevalidatePhone = (e) => {
    const re = /^[0-9]{0,9}$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setPhonenumber(e.target.value);
    }
  };


  useEffect(() =>{
    setFirstname(data['firstname']);
    setLastname(data['lastname']);
    setEmail(data['username']);
    setAge(data['age']);
    setGender(data['gender']);
    setPhonenumber(data['phonenumber']);
  }, []);


  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log({firstname, lastname, username, age, gender, phonenumber});
    const respStatus = await saveUserInfo({firstname, lastname, username, age, gender, phonenumber});
    setStatus(respStatus);
  };

  const sendPicture = async(event) => {
    event.preventDefault();
  };

  return (
    <Container sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', minHeight: '90vh'}}>
      <Box component="form" encType='multipart/form-data' onSubmit={sendPicture} sx={{width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop: 5}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Zmień zdjecie profilowe
        </Typography>

  
        <Avatar src={temp} sx={{marginTop: 3, width: '50%', height: 'auto'}} alt={'Your profile picture'}/>
        <label className={styles.label}>
          <input type="file" required/>
          <span>Dodaj zdjecie</span>
        </label>

        <Button fullWidth sx={{ mt: 3, alignSelf: 'flexEnd' }} variant="contained"  type="submit">Zapisz zdjęcie</Button>
      </Box>

      <Box sx={{width: '60%'}}>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%'
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AppRegistrationIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zmień dane
          </Typography>
          <Box component="form" sx={{ mt: 2 }}
            onSubmit={handleSubmit}>
            <TextField type="text" sx= {{ mt: 1 }} label = "Imię"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled" fullWidth name="firstname" id="firstname" placeholder="Imię" value={firstname} onChange={prevalidateName} required />


            <TextField type="text" sx= {{ mt: 1}} variant="filled" fullWidth name="lastname" id="lastname" placeholder="Nazwisko" value={lastname} onChange={prevalidateLastname} required />

            <TextField 
              label = "Email"
              sx={{ mt: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
              type="text" variant="filled" fullWidth name="email" id="email" placeholder="Adres e-mail" value={username} onChange={(e) => setEmail(e.target.value)} required />

            <Grid container>
              <Grid item xs>
                <TextField
                  sx= {{ mt:1 }}
                  type="number"
                  label="Wiek"
                  variant="filled"
                  name="age"
                  id="age"
                  placeholder="wiek"
                  value={age}
                  onChange={prevalidateAge}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required />
              </Grid>
              <Grid item xs>
                <Select
                  sx= {{ mt:1, ml:1}}
                  value={gender}
                  label = "Płeć"
                  onChange={(e) => setGender(e.target.value)}
                  required>
                  <MenuItem value="M">Mężczyzna</MenuItem>
                  <MenuItem value="K">Kobieta</MenuItem>
                  <MenuItem value="O">Wolę nie podawać</MenuItem>
                </Select>
              </Grid>
            </Grid>


            <TextField variant="filled" type="text" label = "Numer telefonu"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              sx= {{ mt:1 }}
              name="phonenumber" id="phonenumber" placeholder="Numer telefonu" value={phonenumber} onChange={prevalidatePhone} required />


            <Button fullWidth sx={{ mt: 3, mb: 2 }} variant="contained"  type="submit">Zapisz dane</Button>
            {status === 200 ? <Alert variant="filled" severity="success">Dane zostały poprawnie zapisane</Alert>  : <></>}
            {status !== 0 && status !== 200 ? <Alert variant="filled" severity="error">Coś poszło nie tak. Spróbuj ponownie później</Alert>  : <></>}
          </Box>
        </Box>
      </Box>
        
    </Container>


  // </form>

  // <form className={styles.form} onSubmit={handleSubmit}>

  //   <Grid container spacing={2}>
  //     <Grid xs={6}>
  //       <label htmlFor={firstname}>Imie
  //         <input type={'text'} name={'firstName'} value={firstname} id={'fistname'} onChange={e => setFirstname(e.target.value)} />
  //       </label>
  //     </Grid>
  //     <Grid xs={6}>
  //       <label htmlFor={lastname}>Nazwisko
  //         <input type={'text'} name={'lastname'} value={lastname} id={'lastname'} onChange={e => setLastname(e.target.value)} />
  //       </label>
  //     </Grid>
  //     <Grid xs={6}>
  //       <label htmlFor={lastname}>Nazwisko
  //         <input type={'text'} name={'lastname'} value={lastname} id={'lastname'} onChange={e => setLastname(e.target.value)} />
  //       </label>
  //     </Grid>
  //     <Grid xs={6}>
  //       <label htmlFor={username}>Login
  //         <input type={'text'} name={'username'} value={username} id={'username'} onChange={e => setUsername(e.target.value)}/>
  //       </label>
  //     </Grid>

  //     <Grid xs={6}>
  //       <label htmlFor={age}>Wiek
  //         <input type={'number'} name={'age'} value={age} id={'age'} onChange={e => setAge(e.target.value)}/>
  //       </label>
  //     </Grid>

  //     <Grid xs={6}>
  //       <label htmlFor={lastname}>Numer telefonu
  //         <input type={'text'} name={'phonenumber'} value={phonenumber} id={'phonenumber'}onChange={e => setPhonenumber(e.target.value)} />
  //       </label>
  //     </Grid>

  //     <Grid xs={6}>
  //       <label htmlFor={gender}>Płeć
  //         <input type={'text'} name={'gender'} value={gender} id={'gender'} onChange={e => setGender(e.target.value)} />
  //       </label>
  //     </Grid>
  //   </Grid>
  //   <input type={'submit'} name={'submit'} value={'Zapisz dane'} onSubmit={handleSubmit}/>
  );
}




export default MyProfileForm;