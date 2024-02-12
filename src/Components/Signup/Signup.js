import React, { useState,useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useNavigate } from 'react-router-dom';


import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function Signup() {
  const history = useHistory()
  // const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const {firestore} = useContext(FirebaseContext)

  const handleSubmit =async (e)=>{
    e.preventDefault();
    const auth = getAuth();

    try {

      const userCredential= await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser,{displayName:username});
      const userDocRef = await addDoc(collection(firestore,'users'),{
        id:userCredential.user.uid,
        username:username,
        phone:phone
      });
      console.log('Document written with ID: ',userDocRef.id);
      history.push("/login")
      // navigate="/login"

    } catch (error) {
      console.error('Error signing up', error.message);
    }


    // .then((result)=>{
    //   result.user.updateProfile({displayName:username}).then(()=>{
    //     const db = firestore;
    //     setDoc(doc(collection(db,"users")),{
    //       id:result.user.uid,
    //       username:username,
    //       phone:phone
    //     }).then(()=>{
    //         history.push("/login")
    //     }).catch((error)=>{
    //       console.log('Error redirecting to login',error);
    //     })

    //   })

    // })

  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='Logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="name"
            name="name"
          />
          <br />
          <label htmlFor="Email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="Phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="Password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
          />
          <br />
          <br />
          <button >Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
