import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { app } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import {getFirestore } from "@firebase/firestore";
import {addDoc, collection, getDocs,doc, updateDoc } from "@firebase/firestore";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createWallet } from '../utils/Rapyd';
import { Autocomplete } from '@mui/material';
import countryList from 'react-select-country-list';
import { useMemo } from 'react';
import Modal from '@mui/material/Modal';

export default function SignupPage() {
  const [messageOpen, setmessageOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [loading, setLoading] = React.useState(false);
    const theme = createTheme({
        palette: {
            primary: {
              light: 'white',
              main: '#1F3F49',
              dark: '#1F3F49',
              contrastText: 'white',
            }
          },
    });
  const auth = getAuth(app);
  let history = useHistory();
  
  var firestore = null;
  var ref = null;
  
  onAuthStateChanged(auth, async(user) => {
    if (!user) {
      firestore = getFirestore(app);
      ref = collection(firestore, 'users/');
    } else {
      history.push('/');
    }
  });
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setmessageOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    var country = data.get('country');
    country = countryList().getValue(country);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        setMessage("Signup successful");
        setmessageOpen(true);
        addDoc(ref, {
          firstName: firstName,
          lastName: lastName, 
          email: email,
          userId: uid,
          country: country
        }).then(()=>{
            setLoading(false);
            history.push('/');
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorMessage);
        setmessageOpen(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '20px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            padding: '50px',
            background: 'white'
          }}
        >
          <Typography component="h1" variant="h4" style={{fontWeight: 'bold', marginBottom: '30px'}}>
            Signup
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={countryOptions}
                      sx={{ width: '100%', marginTop: '1%' }}
                      renderInput={(params) => <TextField {...params} label="Select Country" name='country' />}
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Snackbar open={messageOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                  {message}
                </Alert>
            </Snackbar>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {loading ? (
                <Modal open={loading} className="loader-container">
                <div className="spinner"></div>
                </Modal>
            ) : <div></div>}
      </Container>
    </ThemeProvider>
  );
}