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
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "@firebase/firestore";
import { useTimer } from 'react-timer-hook';

const CardLayout = (list) => {

    const [isOpenDesc,setIsOpenDesc] = useState(false);
    const [donate,setDonate] = useState(false);
    const [messageOpen, setmessageOpen] = React.useState(false);    
    const currencyList = Object.keys(currencyJson);    
    const [saleCurrency, setSaleCurrency] = React.useState(currencyList[0]);
    const [loading,setLoading] = React.useState(false);
    const userWalletId = list.wallet_id;
    const uid = list.uid;
    var firestore = null;
    var transactionsRef = null;
    var activityRef = null;
    const firebaseAuth = getAuth(app);
    const history = useHistory();
    list= list.item;
    const [diff,setdiff] = React.useState(0)
    const [days,setDays] = React.useState(0);
    const [hours,setHours] = React.useState(0);
    const [minutes,setMinutes] = React.useState(0);
    const [seconds,setSeconds] = React.useState(0);
    var auctionRef = null;

    useEffect(()=>{
        if(donate && list[8]==="Bid"){
            var diff_ = new Date(list[11])-new Date();
            setdiff(diff_);

            var seconds_ = Math.floor(diff_ / 1000),
                minutes_ = Math.floor(seconds_ / 60),
                hours_   = Math.floor(minutes_ / 60),
                days_    = Math.floor(hours_ / 24);

                seconds_ %= 60;
                minutes_ %= 60;
                hours_ %= 24;
                days_ %= 30;
            setDays(days_);
            setHours(hours_);
            setMinutes(minutes_);
            setSeconds(seconds_);
        }
    })

    function MyTimer({ expiryTimestamp }) {
        const {
          seconds,
          minutes,
          hours,
          days,
          isRunning,
          start,
          pause,
          resume,
          restart,
        } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

        return (
            <div style={{textAlign: 'center'}}>
            <h1>react-timer-hook </h1>
            <p>Timer Demo</p>
            <div style={{fontSize: '100px'}}>
                <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
                // Restarts to 5 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + 300);
                restart(time)
            }}>Restart</button>
            </div>
        );

    }
    
    onAuthStateChanged(firebaseAuth, async(user) => {
        if (user) {
          firestore = getFirestore(app);
          auctionRef = collection(firestore, 'auctions/')
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

    const handleBid = (event) => {
        event.preventDefault();
        setLoading(true);
        try{
            const data = new FormData(event.currentTarget);
            const selectSalesCurrency = data.get('selectSalesCurrency');
            const bidAmount = data.get("bidAmount");
            console.log(list);
            addDoc(auctionRef, {
                activityID: list[6],
                bidder: uid,
                bid_amount:bidAmount,
                bid_currency:selectSalesCurrency
            }).then(()=>{
                        setLoading(false);
                        history.push('/');
                    }
                )

        }
        catch(err){
            setLoading(false);
        }
    }

    const handleDonate = (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        const selectSalesCurrency = data.get('selectSalesCurrency');
        const donationAmount = data.get("donationAmount");
        console.log(list);
        var existingActDoc = null;
        getDoc(doc(activityRef, list[6])).then((snapshot)=>{
            existingActDoc = snapshot.data();
        })
        sendMoney(donationAmount,selectSalesCurrency, userWalletId ,list[9], list[3]).then((res)=>{
            if(res.status.status === 'SUCCESS'){
                existingActDoc['required_amount'] -= res.data.amount;
                setDoc(doc(activityRef, list[6]), existingActDoc).then(()=>{
                    setLoading(false);
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
                {list[8]==="Donate"?
                    <Box sx={style}>
                    <h1 className="cardTitle">{list[8]}</h1>
                    <br/>
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
                            name='donationAmount'
                            type={'number'}
                            style={{width:'auto'}}/>
                    </div>
                    <br/>
                    <br/>
                    <Button type="submit" style={{width: '100%', background: '#142e36', color: 'white', fontSize: '100%'}}>Donate</Button>
                    </form>                    
                    </Box>
                    :
                    <Box sx={style}>
                    <h3 className="cardTitle">{list[0]}</h3>
                    <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}} >
                        <div style={{flexDirection:"column"}}>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                                color="textSecondary"
                            >
                                {"ID : "+list[6]}
                            </Typography>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                                color="textSecondary"
                            >
                                {"Minimum Bid Amount : "+list[2]+" "+list[3]}
                            </Typography>
                        </div>
                        <div style={{display:"flex",alignContents:"flex-end",flexDirection:"row", justifyContent:"space-between", gap:"1.5%",verticalAlign:"middle"}}>
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                                color="textSecondary"
                            >
                                Days
                            </Typography>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                                color="textSecondary"
                            >
                                {days}
                            </Typography>
                            </div>
                            : 
                            <div style={{flexDirection:"row",justifyContent:"center"}}>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                                color="textSecondary"
                            >
                                HH
                            </Typography>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                                color="textSecondary"
                            >
                                {hours}
                            </Typography>
                            </div>
                            : 
                            <div style={{flexDirection:"row",justifyContent:"center"}}>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                                color="textSecondary"
                            >
                                MM
                            </Typography>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                                color="textSecondary"
                            >
                                {minutes}
                            </Typography>
                            </div>
                            : 
                            <div style={{flexDirection:"row",justifyContent:"center"}}>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                                color="textSecondary"
                            >
                                SS
                            </Typography>
                            <Typography
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                }}
                                color="textSecondary"
                            >
                                {seconds}
                            </Typography>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <form onSubmit={handleBid}>
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
                            placeholder='Bid Amount' 
                            name='bidAmount'
                            type={'number'}
                            style={{width:'auto'}}/>
                    </div>
                    <br/>
                    <br/>
                    <Button type="submit" style={{width: '100%', background: '#142e36', color: 'white', fontSize: '100%'}}>Place Bid</Button>
                    </form>                    
                    </Box>
                    }
        </Modal>
        <Snackbar open={messageOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                      Copied to clipboard
                    </Alert>
        </Snackbar>
        {loading ? (
                <Modal open={loading} className="loader-container">
                <div className="spinner"></div>
                </Modal>
            ) : <div></div>}
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

