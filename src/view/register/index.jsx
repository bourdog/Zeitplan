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
    const [confirmPassword, setConfirmPassword] = useState();
    const [isRegistered, setIsRegistered] = useState();
    const [loading, setLoading] = useState(false);
    const [typeError, setTypeError] = useState();

    const db = firebase.firestore();
    const dispatch = useDispatch();

    const equalPassword = () => {

        const inputPassword = document.getElementsByName('inputPassword')[0];
        const inputConfirmPassword = document.getElementsByName('inputPassword')[1];
        
        if(inputPassword.value !== inputConfirmPassword.value) {
            inputPassword.classList.add("notEqualPassword"); 
            inputConfirmPassword.classList.add("notEqualPassword"); 
        } else {
            inputPassword.classList.remove("notEqualPassword"); 
            inputConfirmPassword.classList.remove("notEqualPassword"); 
        }
    }

    const controlDateField = () => {
        var inputDate = document.getElementsByName("dateCreateUser")[0];
        var dateToday = new Date();
    
        var day = dateToday.getDate();
        var month = dateToday.getMonth() + 1;
        var year = dateToday.getFullYear();
    
        var dateCompletedMin = `${year - 200}-${("00" + month).slice(-2)}-${("00" + day).slice(-2)}`;
        var dateCompletedMax = `${year}-${("00" + month).slice(-2)}-${("00" + day).slice(-2)}`;
    
        inputDate.min = dateCompletedMin;
        inputDate.max = dateCompletedMax;
    }

    const userRegister = async () => {

        setLoading(true);
        setTypeError(null);

        await firebase.auth().createUserWithEmailAndPassword(
            email,
            password
        )
        .then(async result => {
            await db.collection('userProfile')
            .add({
                id: result.user.uid,
                name: name,
                lastName: lastName,
                birthDate: birthDate,
                email: email,
                create: new Date()
            }).then(() => {
                setIsRegistered(true);
                setLoading(false);
            }).catch(err => {
                console.log('erro ao cadastrar usuário.', err);
                setLoading(false);
            });
            setTimeout(()=>{
                dispatch({
                    type: 'REGISTER',
                    name: name,
                    lastName: lastName,
                    birthDate: birthDate,
                    email: email
                })
            }, 1500)
        }).catch(err => {
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
                                <input 
                                    onChange={ e => setBirthDate(e.target.value)} 
                                    onClick={controlDateField}
                                    className="form-control mb-2" 
                                    type="date" 
                                    name="dateCreateUser" 
                                    required 
                                />
                            </div>
                            <div className="container">
                                <p><strong>E-mail:</strong></p>
                                <input onChange={ e => setEmail(e.target.value)} className="form-control mb-2" type="text" placeholder="Seu e-mail" required />
                                <p><strong>Senha:</strong></p>
                                <input 
                                    onChange={ e => {
                                        setPassword(e.target.value)
                                        equalPassword();
                                    }} 
                                    name="inputPassword" 
                                    className="form-control mb-2" 
                                    type="password" 
                                    placeholder="********" 
                                    required 
                                />
                                <p><strong>Confirmar senha:</strong></p>
                                <input 
                                    onChange={ e => {
                                        setConfirmPassword(e.target.value)
                                        equalPassword();
                                    }} 
                                    name="inputPassword" 
                                    className="form-control mb-2" 
                                    type="password" 
                                    placeholder="********" 
                                    required 
                                />
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
                            <button 
                                onClick={ userRegister } 
                                disabled={ password === confirmPassword ? false : true }
                                type="submit" 
                                className="btn btn-success btn-lg mt-4" 
                                form="formRegister"
                            >
                                <i className="bi bi-check-circle buttonNotItalic"> Salvar</i>
                            </button>
                        </div>
                    )}
                    { password !== confirmPassword && (
                        <div className="container d-flex justify-content-center">
                            <span className='text-danger'>Senhas distintas. ❌</span>
                        </div>
                    )}
                    {isRegistered === true && (
                        <div className="container d-flex justify-content-center">
                            <span className='text-success'>Cadastro inserido. ✅</span>
                        </div>
                    )}
                    {typeError !== null && (
                        <div className="container d-flex justify-content-center">
                            <span className='text-danger'>{ typeError }</span>
                        </div>
                    )}
                    { useSelector(state => state.user.userLogin === true && <Redirect to='/' />) }
                </section>
            </main>
        </>
    );
}

export default Register;