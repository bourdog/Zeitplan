import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbarSignOut';
import { Link, Redirect } from 'react-router-dom';
import { ContainerLogin, Box } from './loginCss';
import firebase from '../../config/firebase';
import 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';

function Login () {

    const handleSubmit = (callback) => (event) => {
        event.preventDefault();
        callback();
    };

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isAuth, setIsAuth] = useState();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const db = firebase.firestore();

    const authenticated = async () => {
        
        setLoading(true);

        await firebase.auth().signInWithEmailAndPassword(
            email,
            password
        )
        .then( async () => {
            setIsAuth(true);
            setLoading(false);
            
            await db.collection("userProfile").where("email", "==", email)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    dispatch({
                        type: 'LOGIN',
                        email: email,
                        name: doc.data().name
                    });
                });
            }).catch(err => console.log(err))
        })
        .catch(err => {
            setIsAuth(false);
            setLoading(false);
            console.log('erro ao autenticar usuário.', err);
        });
    }

    return (
        <>
            <Navbar tab='SignIn'/>
            <ContainerLogin className="container d-flex justify-content-center">
                <Box onSubmit={handleSubmit(authenticated)}>
                    <h1>Login</h1>
                    <p className="text-muted"> Faça o login para ter acesso:</p> 
                    <input onChange={ e => setEmail(e.target.value) } type="text" placeholder="Digite seu e-mail" autoFocus required /> 
                    <input onChange={ e => setPassword(e.target.value) } type="password" placeholder="Sua senha" required /> 
                    <Link className="create text-muted" to="/register">Criar Conta</Link> 
                    { loading === true ? (
                        <div className="d-flex justify-content-center my-4">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <button onClick={authenticated} type="submit">Entrar</button>
                    )}
                    {isAuth === false && <span>Email ou senha incorretos. ⚠️</span>}
                    {useSelector(state => state.user.userLogin) === true && <Redirect to='/' />}
                </Box>
            </ContainerLogin>
        </>
    );
}

export default Login;