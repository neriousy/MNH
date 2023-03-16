import React, { useEffect, useState } from 'react';
import { useSignUp } from '../../hooks/useSignUp';
import Avatar from '@mui/material/Avatar';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

function RegisterForm() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatpassword, setRepeatpassword] = useState('');
  const [age, setAge] = useState(18);
  const [gender, setGender] = useState('M');
  const [phonenumber, setPhonenumber] = useState('');


  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatError, setRepeatError] = useState('');
  const [phonenumberError, setPhonenumberError] = useState('');

  const { signUp, error, status, isLoading } = useSignUp();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('submit');
    // console.log(firstname);
    // console.log(lastname);
    // console.log(email);
    // console.log(password);
    // console.log(repeatpassword);
    // console.log(age);
    // console.log(gender);
    // console.log(phonenumber);

    if (!validateEmail(email)) {
      console.log('niepoprawny email');
      setEmailError('Wprowadź poprawny adres email');
      return;
    } else {
      setEmailError('');
    }
    if (!validatePassword(password)) {
      console.log('niepoprawne hasło');
      setPasswordError('Hasło musi zawierać co najmniej 8 znaków, jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny');
      return;
    } else {
      setPasswordError('');
    }
    if (!validateRepeat(repeatpassword)) {
      console.log('niepoprawne hasło');
      setRepeatError('Hasło nie pasuje do powyższego');
      return;
    } else {
      setRepeatError('');
    }
    if (!validatePhone(phonenumber)) {
      console.log('niepoprawny numer telefonu (poprawny numer telefonu zawiera 9 cyfr)');
      setPhonenumberError('Niepoprawny numer telefonu (poprawny numer telefonu zawiera 9 cyfr)');
      return;
    } else {
      setPhonenumberError('');
    }

    await sendValues();
  };


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

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (re.test(password)) {
      return true;
    }
    return false;
  };
  const validateRepeat = (e) => {
    if (password == repeatpassword) {
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

  const sendValues = async () => {
    await signUp(firstname, lastname, email, password, age, gender, phonenumber);
  };




  return (
    <ThemeProvider theme={theme}>

      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AppRegistrationIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Zarejestruj się
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
              type="text" variant="filled" fullWidth name="email" id="email" placeholder="Adres e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <span>{emailError}</span>


            <TextField
              sx= {{ mt:1 }}
              type="password"
              label = "Hasło"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"  fullWidth autoComplete="current-password" name="password" id="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)}
              required />
            <span>{passwordError}</span>


            <TextField
              sx= {{ mt:1 }}
              variant="filled"
              type="password"
              label = "Powtórz hasło"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth name="repeatpassword" id="repeatpassword" placeholder="Powtórz hasło" value={repeatpassword} onChange={(e) => setRepeatpassword(e.target.value)} required />
            <span>{repeatError}</span>
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
            <span>{phonenumberError}</span>


            <Button fullWidth sx={{ mt: 3, mb: 2 }} variant="contained" disabled={isLoading} type="submit">Zarejestruj się</Button>
            
          </Box>
          {status === 201 ? <Alert variant="filled" severity="success">Zarejestrowanie powiodło się. Potwierdź swój adres email</Alert>  : <></>}
          {status === 226 ? <Alert variant="filled" severity="error">Email jest zajęty</Alert>  : <></>}
          {status === 500 ? <Alert variant="filled" severity="error">{error}</Alert>  : <></>}
        </Box>
        
      </Container>
      
    </ThemeProvider>
  );

}

export default RegisterForm;