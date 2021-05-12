import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbarSignIn';
import { useSelector } from 'react-redux';
import { ContainerProfile, TitlePage } from './profileCss';
import firebase from 'firebase';

function Profile () {

    const db = firebase.firestore();

    const emailUser = useSelector( state => state.user.email );
    const [ idUser, setIdUser ] = useState();
    const [ nameUser, setNameUser ] = useState();
    const [ lastNameUser, setLastNameUser ] = useState();
    const [ birthDateUser, setBirthDateUser ] = useState();
    const [ loading, setLoading ] = useState( false );

    const [ editNameUser, setEditNameUser ] = useState();
    const [ editLastNameUser, setEditLastNameUser ] = useState();
    const [ editBirthDateUser, setEditBirthDateUser ] = useState();

    const dateFormated = birthDateUser ? birthDateUser.split('-').reverse().join('/') : '00/00/0000';
    
    const [ tab, setTab ] = useState( 0 );
    const arrayOfUserData = [];

    const updateDataUser = async () => {
        setLoading( true );
        await db.collection( 'userProfile' )
        .doc( idUser )
        .update({
            name: editNameUser,
            lastName: editLastNameUser,
            birthDate: editBirthDateUser
        })
        .then(() => {
            console.log('Perfil atualizado.');
            setLoading( false );
            setTab( 0 );
        })
        .catch(err => console.log('erro ao atualizar perfil: ', err));
    }

    useEffect(() => {
        const getUserData = async () => {
            await db.collection( 'userProfile' )
            .where( 'email','==', emailUser )
            .get()
            .then( response => {
                response.forEach( doc => {
                    arrayOfUserData.push({
                        id: doc.id,
                        ...doc.data()
                    });

                });
                setNameUser( arrayOfUserData[0].name );
                setLastNameUser( arrayOfUserData[0].lastName );
                setBirthDateUser( arrayOfUserData[0].birthDate );
                setIdUser( arrayOfUserData[0].id );
                setEditNameUser( arrayOfUserData[0].name );
                setEditLastNameUser( arrayOfUserData[0].lastName );
                setEditBirthDateUser( arrayOfUserData[0].birthDate );
            })
            .catch( err => console.log( 'erro ao pegar os dados do usuario.', err ));
        }
        getUserData();
    }, [ tab ]);

    return (
        <>
            <Navbar tab='Profile' />

            <ContainerProfile>
                <TitlePage className="container">
                    <div className="container d-flex justify-content-between align-items-end">
                        Perfil
                    </div>
                </TitlePage>
                <div className="container d-flex justify-content-end my-2">
                        <button className="btn btn-primary mb-1" onClick={ () => setTab( 1 ) }>
                            <i className="bi bi-pencil-fill buttonNotItalic"> Editar</i>
                        </button>
                </div>
                <div className="container d-flex flex-column justify-content-center">
                    { !tab && <div className="container tabContent" id="visualizar">
                        <p>
                            <strong>Nome: </strong>
                            { nameUser }
                        </p>
                        <p>
                            <strong>Sobrenome: </strong>
                            { lastNameUser }
                        </p>
                        <p>
                            <strong>Data de nascimento: </strong>
                            { dateFormated }
                        </p>
                    </div> }
                    { !!tab && <form action="#" className="formProfile tabContent" id="editar">
                        <p><strong>Nome:</strong></p>
                        <input onChange={ e => setEditNameUser( e.target.value ) } className="form-control mb-2" type="text" value={ editNameUser } required />
                        <p><strong>Sobrenome:</strong></p>
                        <input onChange={ e => setEditLastNameUser( e.target.value ) } className="form-control mb-2" type="text" value={ editLastNameUser } required />
                        <label htmlFor="dateEditProfile"><strong>Data de nascimento:</strong></label>
                        <input onChange={ e => setEditBirthDateUser( e.target.value ) } className="form-control mb-2" type="date" name="dateEditProfile" value={ editBirthDateUser } required />
                        { loading === true ? (
                            <div className="d-flex justify-content-center my-3 mx-5">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-end">
                                <button type="button" className="btn btn-dark mt-4 mr-4" onClick={ () => setTab( 0 ) }>
                                    <i className="bi bi-backspace buttonNotItalic"> Voltar</i>
                                </button>
                                <button onClick={ updateDataUser } type="submit" className="btn btn-success mt-4">
                                    <i className="bi bi-check-circle buttonNotItalic"> Salvar</i>
                                </button>
                            </div>
                        )}
                    </form> }
                </div>
            </ContainerProfile>
        </>
    );
}

export default Profile;