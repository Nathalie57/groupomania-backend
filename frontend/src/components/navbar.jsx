import React from 'react'
import { NavLink } from 'react-router-dom'
import authentication from '../services/authentication'

const Navbar = ({ isAuthenticated, onLogout }) => {

    const handleLogout = () => {
        authentication.logout();
        onLogout(false);
    }

    return (
        <ul className="navigation">
            {(!isAuthenticated && (<>
                <li><NavLink to="/login" className="button">Connexion</NavLink></li>
            </>)) || (<>
                    <li><button onClick={handleLogout} className="button">Deconnexion</button></li>
                    <li><NavLink to="/beneficiaire" className="button">Enregistrer un nouveau bénéficiaire</NavLink></li>
                </>)}
        </ul>
    );
}

export default Navbar;