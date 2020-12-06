import React from 'react'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import authentication from '../services/authentication'


const Navbar = ({ isAuthenticated, onLogout }) => {
    const history = useHistory();
    const handleLogout = () => {
        authentication.logout();
        onLogout(false);
        history.push("/");
        <Redirect to="/" refresh="true" />
    }

    return (
        <ul className="navigation">
            {(!isAuthenticated && (<>
                <li><NavLink to="/login" className="button">Connexion</NavLink></li>
            </>)) || (<>
                    <li><button onClick={handleLogout} className="button">Deconnexion</button></li>
                </>)}
        </ul>
    );
}

export default Navbar;