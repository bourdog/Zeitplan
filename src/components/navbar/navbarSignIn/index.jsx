import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import firebase from '../../../config/firebase';


function NavbarSignIn ({ tab }) {

    const nameUser = useSelector(state => state.user.name)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({
            type: 'LOGOUT'
        })
        firebase.auth().signOut().then(() => {
            console.log('Usuário desconectado');
        }).catch( err => {
            console.log(err);
        })
    }

    const capitalizeName = str => {
        if (typeof str !== 'string') {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    useEffect (() => {
        const tabs = document.getElementsByClassName('nav-item');
        for (var i = 0; i < tabs.length; i++){
            tabs[i].classList.remove('active');
            if(tab === 'home') {
                tabs[0].classList.add('active');
            } else if(tabs[i].innerText === tab) {
                tabs[i].classList.add('active');
            }
        }
    }, [tab]);

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbarLogin">
                <div className="container">
                    <Link className="navbar-brand h1 mb-0" id="navbarLogo" to="/">Zeitplan</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-item nav-link" to="/">{capitalizeName(nameUser)}</Link>
                            <Link className="nav-item nav-link" to="/overview">Overview</Link>
                            <Link className="nav-item nav-link" to="/profile">Profile</Link>
                            <Link className="nav-item nav-link" to="/login" onClick={ logout }>SignOut</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavbarSignIn;