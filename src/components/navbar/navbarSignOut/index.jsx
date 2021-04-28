import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

function NavbarSignOut ( props ) {

    useEffect (()=> {
        const tabs = document.getElementsByClassName('nav-item');
        for (var i = 0; i < tabs.length; i++){
            tabs[i].classList.remove('active');
            if(tabs[i].innerText === props.tab) {
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
                            <Link 
                                hidden={props.tab === 'SignIn' ? false : true} 
                                className="nav-item nav-link" 
                                to="/login"
                            >
                                SignIn
                            </Link>
                            <Link 
                                hidden={props.tab === 'SignOut' ? false : true} 
                                className="nav-item nav-link" 
                                to="/register"
                            >
                                SignUp
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavbarSignOut;