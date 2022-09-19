import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from '../firebase';
import { useHistory } from 'react-router-dom';
import {addDoc, collection, getDocs,doc, updateDoc } from "@firebase/firestore";
import {getFirestore } from "@firebase/firestore";
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { TextField, Autocomplete } from '@mui/material';
import countryList from 'react-select-country-list';
import { useMemo } from 'react';

function AppBarWidget() {
  const [fullname, setFullname] = React.useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [editProfile,setEditProfile] = React.useState(false);
  const [messageOpen, setmessageOpen] = React.useState(false);   
  const [message, setMessage] = React.useState(""); 
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [userDetails,setUserDetails] = React.useState({email:"",firstName:"",lastName:"",country:""});
  const [docId,setDocId] = React.useState(null);
  const firebaseAuth = getAuth(app);
  const history = useHistory();
  var ref = null;
  var firestore  = null;
  
  const auth = getAuth(app);

  onAuthStateChanged(firebaseAuth, async(user) => {
    if (user) {
      const uid = user.uid;
      firestore = getFirestore(app);
      ref = collection(firestore, 'users/');
      const querySnapshot = await getDocs(ref);
      querySnapshot.docs.forEach((doc)=>{
        const dt = doc.data();
        if(dt.userId === uid){
          setFullname(dt.firstName + ' ' + dt.lastName);          
          setUserDetails(dt);
          setDocId(doc.id);
        }
      });
    } else {
      history.push('/login');
    }
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setmessageOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleSubmit = async(event)=>{
    event.preventDefault();
        const data = new FormData(event.currentTarget);
        const firstName = data.get('firstName');
        const lastName = data.get('lastName');
        var country = data.get('country');
        country = countryList().getValue(country);
        var ref_ = doc(firestore,"users/"+docId);
        await updateDoc(ref_,{
          firstName:firstName,
          lastName:lastName,
          email: userDetails.email,
          userId: userDetails.userId,
          country: country,
          wallet_id: userDetails.wallet_id
        })
        .then(()=>{
          setMessage("Profile Updated Successfully");
          setmessageOpen(true);
          setEditProfile(false);
        })
        .catch((error)=>{
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorMessage);
          setmessageOpen(true);
        })
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor:"#1F3F49"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SOCIAUCTOR
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key='Marketplace' onClick={()=>history.push('/')}>
                <Typography textAlign="center">Marketplace</Typography>
              </MenuItem>
              <MenuItem key='FundingActivity' onClick={()=>history.push('/funding')}>
                <Typography textAlign="center">Funding Activity</Typography>
              </MenuItem>
              
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '110%'
            }}
          >
            SOCIAUCTOR
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key='Marketplace'
                onClick={()=>history.push('/')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Marketplace
              </Button>
              <Button
                key='FundingActivity'
                onClick={()=>history.push('/funding')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Funding Activity
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div style={{display:'flex', textAlign: 'center'}}>
                  <AccountCircle style={{fontSize:40,color:"white"}}/>
                  <Typography style={{color: 'white', fontWeight: 'bold', marginLeft: '10px', marginTop: '10px', fontSize:'60%'}}>{fullname}</Typography>
                </div>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key='Profile' onClick={()=>{handleCloseUserMenu();setEditProfile(true)}}>
                  <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem key='Account' onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem key='Logout' onClick={()=>{
                signOut(firebaseAuth);
              }}>
                  <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Modal open={editProfile} onClose={()=>{setEditProfile(false);}} style={{ marginTop: '8%', marginBottom: '20%', height: '65%', width: '100%'}}>
              <Box sx={style}>
                    <h1 className="cardTitle">Update your profile</h1>
                    <br/>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      defaultValue = {userDetails.firstName}
                      autoFocus
                    />
                    <br />
                    <br />
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      defaultValue = {userDetails.lastName}
                      autoComplete="family-name"
                    />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value = {userDetails.email}
                        disabled={true}
                        autoComplete="email"
                        autoFocus
                      />
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={countryOptions}
                        sx={{ width: '100%', marginTop: '1%' }}
                        defaultValue={countryList().getLabel(userDetails.country)}
                        renderInput={(params) => <TextField {...params} label="Select Country" name='country' />}
                      />
                      <Button type="submit" style={{width: '100%', background: '#142e36', color: 'white', fontSize: '100%'}} 
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>Update Profile</Button>
                      <Snackbar open={messageOpen} autoHideDuration={6000} onClose={handleClose}>
                          <Alert onClose={handleClose} severity="info">
                            {message}
                          </Alert>
                      </Snackbar>
                  </Box>
              </Box>
      </Modal>
    </AppBar>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  width: '30%',
  maxHeight: '120%',
  overflowY: 'scroll'
};

export default AppBarWidget;