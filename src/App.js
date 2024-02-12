import React, { useContext, useEffect } from 'react';
import './App.css';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import SignUp from './Pages/Signup'
import Login from'./Pages/Login'
import Create from'./Pages/Create'
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthContext,FirebaseContext} from './store/FirebaseContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import View from './Pages/ViewPost';
import Post from './store/PostContext';

function App() {
  const {setUser} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  useEffect(()=>{
    const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {

    // console.log(user)
    setUser(user)
    // ...
  } else {
    // User is signed out
    // ...
  }
});
  })
  return (
    <div>

      <Post>

      <BrowserRouter>

        <Route exact path='/'> <Home /> </Route>  
        <Route path='/signup'> <SignUp /> </Route>  
        <Route path='/login'> <Login /> </Route> 
        <Route path='/create'> <Create /> </Route> 
        <Route path='/view'> <View /> </Route> 

      </BrowserRouter>

      </Post>

    </div>
  );
}

export default App;
