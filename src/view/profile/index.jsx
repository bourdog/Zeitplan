import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbarSignIn';
import { useSelector } from 'react-redux';
import { ContainerProfile, TitlePage } from './profileCss';

function Profile () {

    const nameUser = useSelector( state => state.user.name );
    const lastNameUser = useSelector( state => state.user.lastName );
    const birthDateUser = useSelector( state => state.user.birthDate );
    const dateFormated = birthDateUser ? birthDateUser.split('-').reverse().join('/') : '00/00/0000';

    const [ tab, setTab ] = useState( 0 );

    const getAgeByBirthDate = birthday => {
        
        const dateAge = new Date( birthday );
        
        const dateNow = new Date();

        const age = ( 60 * ( dateNow.getTime() - dateAge.getTime() ));

        return age;
    }

    return (
        <>
            <Navbar tab='Profile' />

            <ContainerProfile>
                <TitlePage>
                    <div className="container d-flex justify-content-between">
                        <p>
                            Perfil
                        </p>
                        <button className="btn btn-primary mb-1" onClick={ () => setTab( 1 ) }>
                            <i className="bi bi-pencil-fill buttonNotItalic"> Editar</i>
                        </button>
                    </div>
                </TitlePage>
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
                            <strong>Idade: </strong>
                            { getAgeByBirthDate( birthDateUser ) }
                        </p>
                        <p>
                            <strong>Data de nascimento: </strong>
                            { dateFormated }
                        </p>
                    </div> }


                    { tab && <form action="#" className="formProfile tabContent" id="editar">
                        <p><strong>Nome:</strong></p>
                        <input className="form-control mb-2" type="text" placeholder="Seu nome" required />
                        <p><strong>Sobrenome:</strong></p>
                        <input className="form-control mb-2" type="text" placeholder="Seu sobrenome" required />
                        <label for="dateEditProfile"><strong>Data de nascimento:</strong></label>
                        <input className="form-control mb-2" type="date" name="dateEditProfile" required />
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-dark mt-4 mr-4" onClick={ () => setTab( 0 ) }>
                                <i className="bi bi-backspace buttonNotItalic"> Voltar</i>
                            </button>
                            <button type="submit" className="btn btn-success mt-4">
                                <i className="bi bi-check-circle buttonNotItalic"> Salvar</i>
                            </button>
                        </div>
                    </form> }
                </div>
            </ContainerProfile>
        </>
    );
}

export default Profile;