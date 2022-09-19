import AppBarWidget from "../Component/AppBar";
import SearchBarWidget from '../Component/SearchBar';
import './styles/SalesDashboard.css';
import {getFirestore } from "@firebase/firestore";
import { app } from '../firebase';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import {addDoc, collection, getDocs, doc, updateDoc } from "@firebase/firestore";
import CardLayout from './CardLayout';


function SalesDashboard() {
    var uid = null;
    var firestore = null;
    var usersRef = null;
    var dealsRef = null;
    const firebaseAuth = getAuth(app);
    const history = useHistory();

    var [deals, setDeals] = React.useState([]);
    var [users, setUsers] = React.useState([]);

    let result=[];
    function List_adder()
    {
        // setLoading(false);
        // if (users.length===0){
        //     setLoading(true);
        // }
        const [isOpen, setIsOpen] = useState(false);
        for(let i=0;i<users.length;i++)
        {
            for (let j=0;  j<deals.length ;j++)
            {
                if(deals[j].artist===users[i].userId)
                {
                    result.push([deals[j].item_name,deals[j].category,deals[j].minimum_bid,deals[j].currency,(users[i].firstName+" "+users[i].lastName),users[i].email,deals[j].pushKey,("Starting Bid"),("Bid"),deals[j].social_cause,deals[j].imgLinks,deals[j].bid_deadline,deals[j].bid_duration]);
                }
                
            }
        }
        return (
            
            <div style={{margin:'3%'}}>
                {/* {CardLayout(result[0])} */}
                {
                    result.map((item) => {
                    return(

                        <div key={item} style={{margin:'1%'}}>
                            {console.log(deals)}
                            {console.log(users)}
                            <CardLayout item={item} />
                        </div>
                        )
                    })
                }
            </div>
            );
    }



    onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
            uid = user.uid;
            firestore = getFirestore(app);
            usersRef = collection(firestore, 'users/');
            dealsRef = collection(firestore, 'deals/');
            if (!deals.length || !users.length) {
                fetchData();
            }
        } else {
            history.push('/login');
        }
    });

    const fetchData = async () => {
        var usersArray = [];
        var dealsArray = [];
        const storage = getStorage();
        var querySnapshot = await getDocs(usersRef);
        querySnapshot.docs.forEach((doc) => {
            var tmp = doc.data();
            tmp['pushKey'] = doc.id;
            usersArray.push(tmp)
        });
        querySnapshot = await getDocs(dealsRef);
        querySnapshot.docs.forEach((doc) => {
            var tmp = doc.data();
            tmp['pushKey'] = doc.id; tmp['imgLinks'] = [];
            const listRef = ref(storage, '/' + doc.id);
            listAll(listRef) // for every folder
                .then((res) => {
                    res.items.forEach((itemRef) => { // for every image
                        getDownloadURL(ref(storage, itemRef.fullPath))
                            .then((url) => {
                                tmp['imgLinks'].push(url);
                            })
                    })
                }).catch((error) => {
                });
            dealsArray.push(tmp)
        });
        setDeals(dealsArray);
        setUsers(usersArray);
    }
    return (
        <div style={{backgroundImage: "url('../../assets/bg1.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
            <AppBarWidget />
            <SearchBarWidget additionTitle="Add Deal" />
            {List_adder()}
        </div>
    );
}
export default SalesDashboard;