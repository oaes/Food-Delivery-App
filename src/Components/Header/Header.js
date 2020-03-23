import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import Logo from '../../Images/logo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../SignUp/useAuth';
const Header = (props) => {
    const auth = useAuth();

    return (
        <nav className="navbar navbar-expand navbar-light bg-white my-2">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={Logo} alt="Hot Onion Logo"/>
                </Link>
               
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item active">
                        <Link to="/checkout" className="nav-link"><FontAwesomeIcon className="cart-icon" icon={faCartArrowDown} /><span className="badge bg-light">{props.cart.length}</span></Link>
                    </li>
                    <li className="nav-item">
                        {
                            auth.user ?  
                             <Link to="/checkout" className="nav-link">{auth.user.displayName}</Link> 
                             :
                             <Link to="/login" className="nav-link">Login</Link> 
                        }
                    </li>
                    <li className="nav-item">
                        {
                            auth.user ? 
                            <Link to="/" className="nav-link">
                                <button onClick={() => {auth.signOut()}} className="btn btn-danger btn-rounded">Sign Out</button>
                            </Link>
                            :
                            <Link to="/login" className="nav-link">
                                <button className="btn btn-danger btn-rounded">Sign Up</button>
                            </Link>
                        }
                       
                    </li>
                </ul>

            </div>
        </nav>
    );
};

export default Header;