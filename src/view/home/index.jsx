import React, { useEffect, useState } from 'react';
import NavbarSignIn from '../../components/navbar/navbarSignIn';
import Card from '../../components/card';
import { BodyMain, Reminders, MainContainerContents } from './homeCss';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux'

 
function Home () {

    const [ createTitle, setCreateTitle ] = useState();
    const [ createSubTitle, setCreateSubTitle ] = useState();
    const [ createDescription, setCreateDescription ] = useState();
    const [ createDay, setCreateDay ] = useState();
    const [ createHour, setCreateHour ] = useState();
    const [ createPriority, setCreatePriority ] = useState(false);

    const [ editTitle, setEditTitle ] = useState();
    const [ editSubTitle, setEditSubTitle ] = useState();
    const [ editDescription, setEditDescription ] = useState();
    const [ editDay, setEditDay ] = useState();
    const [ editHour, setEditHour ] = useState();
    const [ editPriority, setEditPriority ] = useState();

    const [ loading, setLoading ] = useState(false);
    const [ cards, setCards ] = useState([]);

    const db = firebase.firestore();
    const dispatch = useDispatch();

    const emailUser = useSelector( state => state.user.email );
    const idCard = useSelector( state => state.card.id );
    const isUpdating = useSelector( state => state.card.isUpdate );
    const isDeleting = useSelector( state => state.card.isDelete );

    const arrayOfCards = [];

    const controlDateField = () => {
        const inputDate = document.getElementsByName("dateCreateCard")[0];
        const dateToday = new Date();
    
        const day = dateToday.getDate();
        const month = dateToday.getMonth() + 1;
        const year = dateToday.getFullYear();
    
        const dateCompletedMin = `${year}-${("00" + month).slice(-2)}-${("00" + day).slice(-2)}`;
        const dateCompletedMax = `${year + 5}-${("00" + month).slice(-2)}-${("00" + day).slice(-2)}`;
    
        inputDate.min = dateCompletedMin;
        inputDate.max = dateCompletedMax;
    }
    
    const clearInputModal = () => {
        const clear = document.getElementsByClassName("clear");
    
        for(var i = 0; i < clear.length; i++) {
            clear[i].value = "";
        }
    }

    const handleSubmit = callback => event => {
        event.preventDefault();
        callback();
    };

    const createCard = async () => {

        if ( !createTitle || !createSubTitle || !createDescription || !createDay || !createHour ) {
            alert( 'Preencha todos os campos!' );
        }
        else {
            setLoading(true);

            await db.collection('userCards')
            .add({
                email: emailUser,
                title: createTitle,
                subTitle: createSubTitle,
                description: createDescription,
                day: createDay,
                hour: createHour,
                priority: createPriority,
                isDone: false,
                isLate: false,
                create: new Date()
            }).then(() => {
                console.log('Card criado.');
                setLoading(false);
                clearInputModal();
            }).catch( err => {
                setLoading(false);
                console.log('Erro ao criar card.', err);
            });
        }
    }

    const updateCard = async id => {
        if ( !editTitle || !editSubTitle || !editDescription || !editDay || !editHour ) {
            alert( 'Preencha todos os campos!' );
        }
        else {
            await db.collection('userCards')
            .doc(id)
            .update({
                title: editTitle,
                subTitle: editSubTitle,
                description: editDescription,
                day: editDay,
                hour: editHour,
                priority: editPriority
            })
            .then(() => {
                console.log('Card atualizado.');
                dispatch({ type: 'CARD_UPDATED' });
                setLoading(true);
            })
            .catch(err => {
                console.log('erro ao editar card.', err);
                setLoading(true);
            });
            setLoading(false);
        }
    }

    const deleteCard = async id => {
        await db.collection('userCards')
        .doc(id)
        .delete()
        .then(() => {
            console.log('card excluido.');
            dispatch({ type: 'CARD_DELETED' });
        })
        .catch(err => console.log('erro ao excluir card.', err));
    }

    const setEditModalFields = async id => {
        await db.collection('userCards')
        .doc(id)
        .get()
        .then(result => {
            setEditTitle(result.data().title);
            setEditSubTitle(result.data().subTitle);
            setEditDescription(result.data().description);
            setEditDay(result.data().day);
            setEditHour(result.data().hour);
            setEditPriority(result.data().priority);                    
        })
        .catch(err => console.log('erro: ', err));
    }

    useEffect(() => { 
        const getUserCards = async () => {
            if(emailUser){
                await db.collection('userCards')
                .where('email','==', emailUser)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        arrayOfCards.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    });
                    setCards(arrayOfCards);
                }).catch(err => console.log(err));
            }
        }
        getUserCards();    
    }, [loading, isDeleting]);

    useEffect(() => {
        if(isUpdating) {
            setLoading(true);
            if(idCard) {
                setEditModalFields(idCard);
            }
            setLoading(false);
            dispatch({ type: 'CARD_UPDATED' });
        }
    }, [ isUpdating ]);

    return (
        <BodyMain>
            <NavbarSignIn tab='home'/>
            <Reminders className="container d-flex justify-content-between">
                <div>
                    Lembretes
                </div>
            </Reminders>
            <div className="container d-flex justify-content-end my-2">
                <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#createModal">
                    <i className="bi bi-calendar-plus buttonNotItalic"> Criar</i>
                </button>
            </div>

            <MainContainerContents className="d-flex flex-wrap justify-content-center">
                { cards && cards.map((element, index) => {
                    return (
                        <Card 
                            email={ emailUser }
                            title={ element.title } 
                            subTitle={ element.subTitle }
                            description={ element.description }
                            day={ element.day }
                            hour={ element.hour }
                            priority={ element.priority }
                            isDone={ element.isDone }
                            isLate={ element.isLate }
                            id={ element.id }
                            key={ index }
                        />
                    )
                })}
            </MainContainerContents>

            {/*<!-- ModalCreate -->*/}
            <div className="modal fade" id="createModal" tabIndex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header headerModal">
                            <h5 className="modal-title h1 modalLabel" id="createModalLabel">Criar lembrete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="closerButton">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container d-flex justify-content-center">
                                <form onSubmit={ handleSubmit(createCard) } action="#" className="formCreateModal">
                                    <p><strong>Título:</strong></p>
                                    <input onChange={ e => setCreateTitle(e.target.value)} className="form-control mb-2 clear" type="text" placeholder="Reunião" required />
                                    <p><strong>Subtítulo:</strong></p>
                                    <input onChange={ e => setCreateSubTitle(e.target.value)} className="form-control mb-2 clear" type="text" placeholder="Contratar estágiarios" required />
                                    <p><strong>Descrição:</strong></p>
                                    <textarea onChange={ e => setCreateDescription(e.target.value)} className="form-control mb-2 clear" placeholder="Analisar cúrriculos, etc..." required />
                                    <p><strong>Dia:</strong></p>
                                    <input onChange={ e => setCreateDay(e.target.value)} className="form-control mb-2 clear" type="date" name="dateCreateCard" onClick={controlDateField} required />
                                    <p><strong>Hora:</strong></p>
                                    <input onChange={ e => setCreateHour(e.target.value)} className="form-control mb-2 clear" type="time" required />
                                    <div className="d-flex form-check align-items-center mb-2 clear">
                                        <input onChange={ e => setCreatePriority(e.target.checked)} className="form-check-input" defaultChecked={ false } type="checkbox" id="createCheckbox" />
                                        <label className="form-check-label mt-2" htmlFor="createCheckbox">
                                            <strong>Prioritario</strong>      
                                        </label>
                                    </div>  
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            { loading === true ? (
                                <div className="d-flex my-3 mx-5">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                        <i className="bi bi-x-circle buttonNotItalic"> Fechar</i>            
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={clearInputModal}>
                                        <i className="bi bi-eraser-fill buttonNotItalic"> Limpar</i>
                                    </button>
                                    <button onClick={ createCard } type="submit" className="btn btn-success" data-dismiss="modal">
                                        <i className="bi bi-check-circle buttonNotItalic"> Salvar</i>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- /ModalCreate -->*/}
            {/*<!-- ModalEdit -->*/}
            <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header headerModal">
                            <h5 className="modal-title h1 modalLabel" id="editModalLabel">Editar lembrete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="closerButton">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container d-flex justify-content-center">
                                <form onSubmit={ handleSubmit(createCard) } action="#" className="formCreateModal">
                                    <p><strong>Título:</strong></p>
                                    <input onChange={ e => setEditTitle(e.target.value)} className="form-control mb-2 clear" type="text" placeholder="Reunião" value={ editTitle ? editTitle : "" } required />
                                    <p><strong>Subtítulo:</strong></p>
                                    <input onChange={ e => setEditSubTitle(e.target.value)} className="form-control mb-2 clear" type="text" placeholder="Contratar estágiarios" value={ editSubTitle ? editSubTitle : "" } required />
                                    <p><strong>Descrição:</strong></p>
                                    <textarea onChange={ e => setEditDescription(e.target.value)} className="form-control mb-2 clear" placeholder="Analisar cúrriculos, etc..." value={ editDescription ? editDescription : ""} required />
                                    <p><strong>Dia:</strong></p>
                                    <input onChange={ e => setEditDay(e.target.value)} className="form-control mb-2 clear" type="date" name="dateCreateCard" onClick={controlDateField} value={ editDay ? editDay : "" } required />
                                    <p><strong>Hora:</strong></p>
                                    <input onChange={ e => setEditHour(e.target.value)} className="form-control mb-2 clear" type="time" value={ editHour ? editHour : "" } required />
                                    <div className="d-flex form-check align-items-center mb-2 clear">
                                        <input onChange={ e => setEditPriority(e.target.checked)} className="form-check-input" type="checkbox" id="editCheckbox2" checked={ editPriority ? editPriority : false } />
                                        <label className="form-check-label mt-2" htmlFor="editCheckbox2">
                                            <strong>Prioritario</strong>      
                                        </label>
                                    </div>  
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            { loading === true ? (
                                <div className="d-flex my-3 mx-5">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                        <i className="bi bi-x-circle buttonNotItalic"> Fechar</i>            
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={clearInputModal}>
                                        <i className="bi bi-eraser-fill buttonNotItalic"> Limpar</i>
                                    </button>
                                    <button onClick={ () => { updateCard(idCard) } } type="submit" className="btn btn-success" data-dismiss="modal">
                                        <i className="bi bi-check-circle buttonNotItalic"> Editar</i>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- /ModalEdit -->*/}
            {/*<!-- ModalDeleteConfirm -->*/}
            <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header headerModal">
                            <h5 className="modal-title h1 modalLabel" id="deleteModalLabel">Excluir lembrete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="closerButton">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container d-flex justify-content-center">
                                <p>Tem certeza que deseja <strong>excluir</strong>?</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            { loading === true ? (
                                <div className="d-flex my-3 mx-5">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                        <i className="bi bi-x-circle buttonNotItalic"> Cancelar</i>            
                                    </button>
                                    <button onClick={ () => { deleteCard(idCard) } } type="submit" className="btn btn-danger" data-dismiss="modal">
                                        <i className="bi bi-check-circle buttonNotItalic"> Excluir</i>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- /ModalDeleteConfirm -->*/}
        </BodyMain>
    );
}

export default Home;