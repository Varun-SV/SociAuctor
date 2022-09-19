import { Card, CardContent, Typography, Button, FormControl, Select, InputLabel, TextField } from "@mui/material";
import './styles/FundingDashboard.css';
import React, { useEffect, useState } from "react";
import './styles/FundingDashboard.css';
import { motion } from "framer-motion";
import Popup from 'reactjs-popup';
import Carousel from 'framer-motion-carousel'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import currencyJson from '../assets/Common-Currency.json';
import { createPayment, sendMoney } from "../utils/Rapyd";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";
import { useHistory } from "react-router-dom";
import { collection, doc, getDoc, getFirestore, setDoc } from "@firebase/firestore";

const CardLayout = (list) => {

    const [isOpenDesc,setIsOpenDesc] = useState(false);
    const [donate,setDonate] = useState(false);
    const [messageOpen, setmessageOpen] = React.useState(false);    
    const currencyList = Object.keys(currencyJson);    
    const [saleCurrency, setSaleCurrency] = React.useState(currencyList[0]);
    const userWalletId = list.wallet_id;
    const uid = list.uid;
    var firestore = null;
    var transactionsRef = null;
    var activityRef = null;
    const firebaseAuth = getAuth(app);
    const history = useHistory();
    list= list.item;
    
    onAuthStateChanged(firebaseAuth, async(user) => {
        if (user) {
          firestore = getFirestore(app);
          transactionsRef = collection(firestore, 'users/' + firebaseAuth.currentUser.uid + '/transactions/');
          activityRef = collection(firestore, 'activities/');
        } else {
          history.push('/login');
        }
    });

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const handleSalesCurrencyChange = (event) => {
        setSaleCurrency(event.target.value);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setmessageOpen(false);
    };

    const handleDonate = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const selectSalesCurrency = data.get('selectSalesCurrency');
        const donationAmount = data.get("donationAmound");
        console.log(list);
        var existingActDoc = null;
        getDoc(doc(activityRef, list[6])).then((snapshot)=>{
            existingActDoc = snapshot.data();
        })
        sendMoney(donationAmount,selectSalesCurrency, userWalletId ,list[9]).then((res)=>{
            if(res.status.status === 'SUCCESS'){
                existingActDoc['required_amount'] -= res.data.amount;
                setDoc(doc(activityRef, list[6]), existingActDoc).then(()=>{
                    history.push('/');
                })
            }
          }).catch((e)=>{
            return;
          }) 
    }

   

    return (
        <div>
            <Card className="cards"
                    id="cards"
                    onClick={()=>{setIsOpenDesc(!isOpenDesc);}}
                    style={{
                        width: "45%",
                        borderRadius: 10,
                        border: "5px solid #E5E5E5",
                        marginBottom: "5px",
                    }}
                >
                    <CardContent>
                    <div>
                            <Typography
                                    style={{
                                        align: "center",
                                        fontWeight: "bold",
                                        fontSize: 20,
                                    }}
                                >
                                    {list[0]}
                            </Typography>
                            <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
                                <div style={{flexDirection:"column"}}>
                                    <Typography
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            fontFamily: 'Roboto',
                                        }}
                                        color="textSecondary"
                                    >
                                            {list[1]}
                                    </Typography>
                                    <Typography
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            fontFamily: 'Roboto',
                                        }}
                                        color="textSecondary"
                                    >
                                        {"ID : "+list[6]} 
                                        <ContentCopyIcon style={{color:"grey", marginLeft:"3px", verticalAlign:"middle"}} onClick={(e) =>  {e.stopPropagation();navigator.clipboard.writeText(list[6]);setmessageOpen(true);}} />
                                    </Typography>
                                </div>
                                <div style={{flexDirection:"row"}}>
                                    <Typography
                                        style={{
                                            fontSize: 14,
                                            textAlign:"right,"
                                        }}
                                        color="textSecondary"
                                    >
                                        {list[7]}
                                    </Typography>
                                    <Typography
                                        style={{
                                            fontSize: 14,
                                        }}
                                        color="textSecondary"
                                    >
                                        {list[2] + " " + list[3]}
                                    </Typography>                                    
                                    <Button style={{backgroundColor: '#142e36', color: 'white'}} onClick={(e)=>{e.stopPropagation();setDonate(true);}}> {list[8]} </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
            </Card>
            <Modal
                open={isOpenDesc}
                onClose={()=>{setIsOpenDesc(false)}}
                style={{ marginTop: '2%', marginBottom: '20%', height: '65%', width: '100%'}}
                >
                    <Box sx={style}>
                        <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                        
                        
                        <h1 className="cardTitle">{list[0]}</h1>
                        {/* <Carousel>
                            {list[10].map((item, index) => (
                                <div 
                                key={index}
                                className="carousel-items"
                                style={{backgroundColor:list[index]}}
                                ></div>                                
                            ))}
                        </Carousel> */}

                        <div 
                            style={{
                                // display:'flex',
                                flexDirection:'column',
                            }}
                        >
                            <Typography>{list[11]!==undefined?(list[11]):(<p style={{fontFamily:"Roboto", fontWeight:'bold'}}>{list[1]+" by "+list[4]}</p>)}</Typography>
                        </div>
                        
                        <br/>
                        </div>
                    </Box>
         
        </Modal>
        <Modal
                open={donate}
                onClose={()=>{setDonate(false)}}
                style={{ marginTop: '8%', marginBottom: '20%', height: '65%', width: '100%'}}
                >
                    <Box sx={style}>
                    <h1 className="cardTitle">{list[8]}</h1>
                    <br/>
                    {list[8]==="Donate"?
                    <form onSubmit={handleDonate}>
                    <div style={{display:"flex",flexDirection:"row", justifyContent:"space-evenly"}}>
                        <FormControl style={{width:'40%'}}>
                            <InputLabel id="deal-currency-select-label">Select Currency</InputLabel>
                            <Select
                                labelId='deal-currency-select-label'
                                label='Select Currency'
                                onChange={handleSalesCurrencyChange}
                                value={saleCurrency}
                                name='selectSalesCurrency'
                            >
                                {currencyList.map((category)=>{
                                    return (<MenuItem value={category} key={category}>
                                        <Typography>{category}</Typography>
                                    </MenuItem>)
                                })
                                }
                            </Select>
                        </FormControl>
                        <TextField 
                            placeholder='Donation Amount' 
                            name='donationAmound'
                            type={'number'}
                            style={{width:'auto'}}/>
                    </div>
                    <br/>
                    <br/>
                    <Button type="submit" style={{width: '100%', background: '#142e36', color: 'white', fontSize: '100%'}}>Donate</Button>
                    </form>
                    :
                    <div></div>
                    }
                    </Box>
        </Modal>
        <Snackbar open={messageOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                      Copied to clipboard
                    </Alert>
        </Snackbar>
    </div>
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

export default CardLayout;

