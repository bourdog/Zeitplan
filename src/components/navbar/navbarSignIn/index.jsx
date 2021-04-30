import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import firebase from '../../../config/firebase';


function NavbarSignIn (props) {

    const emailUser = useSelector(state => state.email);
    const [nameUser, setNameUser] = useState('Usuário'); 
    const dispatch = useDispatch();
    const db = firebase.firestore();

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
        const getNameFromUser = async () => {
            await db.collection("userProfile").where("email", "==", emailUser)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    setNameUser(doc.data().name);
                });
            }).catch(err => console.log(err))
        }
        getNameFromUser();
    },[emailUser, db]);

    useEffect (() => {
        const tabs = document.getElementsByClassName('nav-item');
        for (var i = 0; i < tabs.length; i++){
            tabs[i].classList.remove('active');
            if(props.tab === 'home') {
                tabs[0].classList.add('active');
            } else if(tabs[i].innerText === props.tab) {
                tabs[i].classList.add('active');
            }
        }
    }, [props.tab]);

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
                            <Link className="nav-item nav-link" to="/login" onClick={ logout }>Sign out</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavbarSignIn;