import React, {useState} from 'react';
import NavbarSignOut from '../../components/navbar/navbarSignOut';
import { Link, Redirect } from 'react-router-dom';
import { TitlePage, FormProfile } from './registerCss';
import firebase from '../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';

function Register () {
    
    const handleSubmit = (callback) => (event) => {
        event.preventDefault();
        callback();
    };

    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [birthDate, setBirthDate] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isRegistered, setIsRegistered] = useState();
    const [loading, setLoading] = useState(false);
    const [typeError, setTypeError] = useState();

    const db = firebase.firestore();
    const dispatch = useDispatch();

    function userRegister () {

        setLoading(true);
        setTypeError(null);

        firebase.auth().createUserWithEmailAndPassword(
            email,
            password
        ).then(()=> {
            db.collection('userProfile').add({
                name: name,
                lastName: lastName,
                birthDate: birthDate,
                email: email,
                create: new Date()
            }).then(() => {
                setIsRegistered(true);
                setLoading(false);
                setTimeout(()=>{
                    dispatch({
                        type: 'REGISTER',
                        name: name,
                        lastName: lastName,
                        birthDate: birthDate,
                        email: email
                    })
                }, 1500)
            }).catch( err => {
                setLoading(false);
                
            });
        }).catch( err => {
            setLoading(false);
            console.log(err);
            switch(err.message) {
                case 'Password should be at least 6 characters':
                    setTypeError('A senha deve conter ao menos 6 caracteres.');
                    break;
                case 'The email address is already in use by another account.':
                    setTypeError('O email inserido já está em uso por outra pessoa.');
                    break;
                case 'The email address is badly formatted.':
                    setTypeError('O formato do email inserido é inválido.');
                    break;
                default:
                    setTypeError('Ocorreu um erro inesperado. Por favor tente mais tarde.');
            }
        });

        
    }

    return (
        <>
            <NavbarSignOut tab='SignOut' />
            <main>
                <section>
                    <TitlePage className="container d-flex justify-content-between">
                        Cadastrar
                    </TitlePage>
                </section>
                <section>
                    <div className="container d-flex justify-content-center">
                        <FormProfile onSubmit={ handleSubmit(userRegister) } action="#" className="container d-flex justify-content-center" id="formRegister">
                            <div className="container">
                                <p><strong>Nome:</strong></p>
                                <input onChange={ e => setName(e.target.value)} className="form-control mb-2" type="text" placeholder="Seu nome" required />
                                <p><strong>Sobrenome:</strong></p>
                                <input onChange={ e => setLastName(e.target.value)} className="form-control mb-2" type="text" placeholder="Seu sobrenome" required />
                                <p><strong>Data de nascimento:</strong></p>
                                <input onChange={ e => setBirthDate(e.target.value)} className="form-control mb-2" type="date" required />
                            </div>
                            <div className="container">
                                <p><strong>E-mail:</strong></p>
                                <input onChange={ e => setEmail(e.target.value)} className="form-control mb-2" type="text" placeholder="Seu e-mail" required />
                                <p><strong>Senha:</strong></p>
                                <input onChange={ e => setPassword(e.target.value)} className="form-control mb-2" type="password" placeholder="********" required />
                                <p><strong>Confirmar senha:</strong></p>
                                <input className="form-control mb-2" type="password" placeholder="********" required />
                            </div>                    
                        </FormProfile>                
                    </div>
                    { loading === true ? (
                        <div className="d-flex justify-content-center my-4">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="container d-flex justify-content-end mb-5">
                            <Link to="/login">
                                <button type="button" className="btn btn-dark btn-lg mt-4 mr-4">
                                    <i className="bi bi-backspace buttonNotItalic"> Voltar</i>
                                </button>
                            </Link>                
                            <button onClick={ userRegister } type="submit" className="btn btn-success btn-lg mt-4" form="formRegister">
                                <i className="bi bi-check-circle buttonNotItalic"> Salvar</i>
                            </button>
                        </div>
                    )}
                    {isRegistered === true && (
                        <div className="container d-flex justify-content-center">
                            <span className='text-success'>Cadastro inserido. ✅</span>
                        </div>
                    )}
                    {typeError !== null && (
                        <div className="container d-flex justify-content-center">
                            <span className='text-danger'>{typeError} ⚠️</span>
                        </div>
                    )}
                    { useSelector(state => state.userLogin === true && <Redirect to='/' />) }
                </section>
            </main>
        </>
    );
}

export default Register;