import { Typography } from "@mui/material";
import AppBarWidget from "../Component/AppBar";
import SearchBarWidget from '../Component/SearchBar';
import './styles/FundingDashboard.css';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from '../firebase';
import { useHistory } from 'react-router-dom';
import {addDoc, collection, getDocs, doc, updateDoc } from "@firebase/firestore";
import {getFirestore } from "@firebase/firestore";
import React, { useEffect } from "react";

function FundingDashboard() {

    var uid = null;
    var firestore = null;
    var usersRef = null;
    var activityRef = null;
    const firebaseAuth = getAuth(app);
    const history = useHistory();
    
    var [activities, setActivities] = React.useState([]);
    var [users, setUsers] = React.useState([]);

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
        activitiesArray.push(tmp)
      });
      setActivities(activitiesArray);
      setUsers(usersArray);
    }

    return (
        <div style={{background: 'white', height: '100vh'}}>
            <AppBarWidget />
            <SearchBarWidget additionTitle="Add Activity" />
            <br/>
            {activities.map((act)=>{
                return(
                    <Typography>{JSON.stringify(act)}</Typography>
                )
            })}
            {users.map((act)=>{
                return(
                    <Typography>{JSON.stringify(act)}</Typography>
                )
            })}
        </div>
    );
}
export default FundingDashboard;