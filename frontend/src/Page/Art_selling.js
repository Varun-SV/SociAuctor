import React from 'react';

function Art_selling() {
    var [deals, setDeals] = React.useState([]);
    var [users, setUsers] = React.useState([]);
    onAuthStateChanged(firebaseAuth, async(user) => {  
        if (user) {
          uid = user.uid;
          firestore = getFirestore(app);
          usersRef = collection(firestore, 'users/');
          dealsRef = collection(firestore, 'deals/');
          if(!deals.length || !users.length){
            fetchData();
          }
        } else {
          history.push('/login');
        }
    });

    const fetchData = async() => {
        var usersArray = [];
        var dealsArray = [];
        const storage = getStorage();
        var querySnapshot = await getDocs(usersRef);
        querySnapshot.docs.forEach((doc)=>{
          var tmp = doc.data();
          tmp['pushKey'] = doc.id;
          usersArray.push(tmp)
        });
        querySnapshot = await getDocs(dealsRef);
        querySnapshot.docs.forEach((doc)=>{
          var tmp = doc.data();
          tmp['pushKey'] = doc.id;tmp['imgLinks'] = [];
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
          dealsArray.push(tmp)
        });
        setDeals(dealsArray);
        setUsers(usersArray);
      }

  return (
    <div>
      {console.log(dealsArray)}
    </div>
  );
}

export default Art_selling;
