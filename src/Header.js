import React from 'react';
import './Header.css';
import Amazon from './images/.png';
import { FaSearch } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import {Link} from 'react-router-dom';
import { useStateValue } from './StateProvider';
import {auth} from './firebase';


function Header() {
  const [{basket, user}, dispatch] =useStateValue();

  const handleauth = () =>{
    if (user) {
      auth.signOut(); 
    }
  }

  return (
    <div className='header'>
      <Link to='/'>
      <img className='header__logo' 
      src={Amazon} alt="" />

      </Link>

      <div className="header__search">
        <input className='header__searchInput' type="text" />
        <FaSearch className='header__searchIcon'/>
      </div>

      <div className="header__nav">
        <Link to={!user && '/login'}>
        <div onClick={handleauth} className="header__option">
            <span className="header__optionLineOne">
                Hello {!user ? 'Guest' : user.email}
            </span>
            <span className="header__optionLineTwo">
             {user ? 'sign Out' : 'Sign In'}
            </span>
        </div>
        </Link>
    
       <Link to='/orders'>
       <div className="header__option">
        <span className="header__optionLineOne">
                &Returns
            </span>
        <span className="header__optionLineTwo">
                Orders
            </span>
        </div>
       </Link>
        <div className="header__option">
        <span className="header__optionLineOne">
                Your
            </span>
        <span className="header__optionLineTwo">
                Prime
            </span>
        </div>

       <Link to='/checkout'>
       <div className="header__optionBasket">
            <BsFillCartCheckFill/>
            <span className='header__optionLineTwo header__basketCount'>
              {basket?.length}
            </span>
        </div>
       </Link>
      </div>
    </div>
  )
}

export default Header;
