import React,{useContext} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext ,FirebaseContext } from '../../store/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

function Header() {

  const {user} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      signOut(auth).then(()=>{
        // history.push('/login');
        navigate('/login')
      })
     
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={()=>navigate('/login')}>{user ? `Welcome ${user.displayName}` : 'Login'}</span>
          <hr />
        </div>
        {user && <span className='logoutbutton' onClick={handleLogout}>Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
