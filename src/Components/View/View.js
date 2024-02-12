import React, { useEffect, useState, useContext } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/config';

function View() {

  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const { userId } = postDetails;
    const myCollection = collection(firestore, "users");
    const q = query(myCollection, where('id', '==', userId));

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });

  })

  // useEffect(() => {
  //   const { userId } = postDetails;
  //   const getUsers = async () => {
  //     if (!userId || !firebase) return; // Ensure userId and firebase are available
  //     const q = query(collection(firebase.firestore(), 'users'), where('id', '==', userId));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //       setUserDetails(doc.data());
  //     });
  //   };
  //   getUsers();
  // }, [postDetails, firebase]); // Add firebase as a dependency


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails && postDetails.price} </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
