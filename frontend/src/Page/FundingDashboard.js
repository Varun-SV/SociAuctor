import { Typography } from "@mui/material";
import AppBarWidget from "../Component/AppBar";
import SearchBarWidget from '../Component/SearchBar';
import './styles/FundingDashboard.css';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from '../firebase';
import { useHistory } from 'react-router-dom';
import {addDoc, collection, getDocs, doc, updateDoc } from "@firebase/firestore";
import {getFirestore } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import {motion} from 'framer-motion';
import { stringify } from "@firebase/util";
import {CardActions} from '@mui/material';
import CardLayout from './CardLayout';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import Modal from '@mui/material/Modal';
import createPayment from "../utils/Rapyd";

function FundingDashboard() {

    var uid = null;
    var firestore = null;
    var usersRef = null;
    var activityRef = null;
    const firebaseAuth = getAuth(app);
    const history = useHistory();
    
    var [activities, setActivities] = React.useState([]);
    var [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    onAuthStateChanged(firebaseAuth, async(user) => {
        if (user) {
          uid = user.uid;
          firestore = getFirestore(app);
          usersRef = collection(firestore, 'users/');
          activityRef = collection(firestore, 'activities/');
          if(!activities.length || !users.length){
            fetchData();
          }
        } else {
          history.push('/login');
        }
    });
      
    const fetchData = async() => {
      var usersArray = [];
      var activitiesArray = [];
      const storage = getStorage();
      var querySnapshot = await getDocs(usersRef);
      querySnapshot.docs.forEach((doc)=>{
        var tmp = doc.data();
        tmp['pushKey'] = doc.id;
        usersArray.push(tmp)
      });
      querySnapshot = await getDocs(activityRef);
      querySnapshot.docs.forEach((doc)=>{
        var tmp = doc.data();
        tmp['pushKey'] = doc.id;
        tmp['imgLinks'] = [];
        const listRef = ref(storage, '/'+doc.id);
        listAll(listRef) // for every folder
            .then((res) => {
                res.items.forEach((itemRef)=>{ // for every image
                    getDownloadURL(ref(storage, itemRef.fullPath))
                        .then((url) => {
                            console.log(url); // URL for image
                            tmp['imgLinks'].push(url);
                        })
                })
            }).catch((error) => {
            });
        activitiesArray.push(tmp)
      });
      setActivities(activitiesArray);
      setUsers(usersArray);
    }
    
    useEffect(()=>{
      /* createPayment(500, 'US', 'USD', 'USD').then((res)=>{
        window.location.href = res.redirect_url;
      }) */
    }, []);

    let result=[];
    
    function List_adder()
    {
        // setLoading(false);
        // if (users.length===0){
        //     setLoading(true);
        // }
        console.log(users);
        const [isOpen, setIsOpen] = useState(false);
        for(let i=0;i<users.length;i++)
        {
            console.log("inside adding function")
            for (let j=0;  j<activities.length ;j++)
            {
                if(activities[j].poster===users[i].userId)
                {
                    result.push([activities[j].activity_name,activities[j].category,activities[j].required_amount,activities[j].currency,(users[i].firstName+" "+users[i].lastName),users[i].email,activities[j].pushKey]);
                }                
            }
        }
        return (            
            <div style={{margin:'3%'}}>
                {/* {CardLayout(result[0])} */}
                {
                    result.slice(0,1).map((item,idx) => {

                    return(
                        <div key={idx} style={{margin:'1%'}}>
                            {console.log(activities)}
                            {console.log(users)}
                            {CardLayout(item)}
                        </div>
                        )
                    })
                }
            </div>
            );
    }

    return (
        <div className="data" style={{backgroundColor: 'transparent'}}>
            <AppBarWidget />
            <SearchBarWidget additionTitle="Add Activity" />
            <br/>
            {loading ? (
                <Modal open={loading} className="loader-container">
                <div className="spinner"></div>
                </Modal>
            ) : List_adder()}  
        </div>
    );
}
export default FundingDashboard;