import React, { useEffect, useState } from 'react';
import NavbarSignIn from '../../components/navbar/navbarSignIn';
import Card from '../../components/card';
import { BodyMain, Reminders, MainContainerContents } from './homeCss';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux'
 
function Home () {

    const [title, setTitle] = useState();
    const [subTitle, setSubTitle] = useState();
    const [description, setDescription] = useState();
    const [day, setDay] = useState();
    const [hour, setHour] = useState();
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);

    const db = firebase.firestore();
    const dispatch = useDispatch();

    const emailUser = useSelector(state => state.email);
    var ArrayOfCards = [];


    const searchDate = (textDate) => {
    
        if(textDate.length === 2 || textDate.length === 5){
            textDate = textDate + '/';
            document.forms[0].date.value = textDate;
        }
    }

    const controlDateField = () => {
        var inputDate = document.getElementsByName("dateCreateCard")[0];
        var dateToday = new Date();
    
        var day = dateToday.getDate();
        var month = dateToday.getMonth() + 1;
        var year = dateToday.getFullYear();
    
        var dateCompletedMin = `${year}-${("00" + month).slice(-2)}-${("00" + day).slice(-2)}`;
        var dateCompletedMax = `${year + 5}-${("00" + month).slice(-2)}-${("00" + day).slice(-2)}`;
    
        inputDate.min = dateCompletedMin;
        inputDate.max = dateCompletedMax;
    }
    
    const clearInputModal = () => {
        var clear = document.getElementsByClassName("clear");
    
        for(var i = 0; i < clear.length; i++) {
            clear[i].value = "";
        }
    }

    const handleSubmit = (callback) => (event) => {
        event.preventDefault();
        callback();
    };

    const createCard = () => {

        setLoading(true);

        db.collection('userCards').add({
            email: emailUser,
            title: title,
            subTitle: subTitle,
            description: description,
            day: day,
            hour: hour,
            create: new Date()
        }).then(() => {
            setLoading(false);
            dispatch({
                type: 'CARD',
                email: emailUser,
                title: title,
                subTitle: subTitle,
                description: description,
                day: day,
                hour: hour
            })
        }).catch( err => {
            setLoading(false);
            console.log(err);
        });
    }

    useEffect(() => { 
        const getUserCards = async () => {
            db.collection('userCards').where('email','==', emailUser)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    ArrayOfCards.push(doc.data());
                });
                setCards(ArrayOfCards);
            }).catch(err => console.log(err));
        }
        getUserCards();    
    },[ArrayOfCards, emailUser, db]);

    return (
        <BodyMain>
            <NavbarSignIn tab='home'/>
            <Reminders className="container d-flex justify-content-between">
                <div className="reminder">
                    Lembretes
                </div>
                <form className="form-inline formSearch reminder" action="#" id="inputSearch">
                <div className="d-flex align-items-start">
                    <div className="form-group mb-2">
                    <input type="search" className="form-control" placeholder="Buscar por data" name="date" onKeyPress={(e)=> searchDate(e.target.value)} maxLength="10" required />
                    </div>
                    <button type="submit" className="btn btn-secondary ml-2" form="inputSearch">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                </form>
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
                            title={element.title} 
                            subTitle={element.subTitle}
                            description={element.description}
                            day={element.day}
                            hour={element.hour}
                            key={index}
                        />
                    )
                })}
            </MainContainerContents>

            {/*<!-- Modal -->*/}
            <div className="modal fade" id="createModal" tabIndex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" id="contentModal">
                        <div className="modal-header" id="headerModal">
                            <h5 className="modal-title h1" id="createModalLabel">Criar lembrete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" id="closerButton">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id="mainModal">
                            <div className="container d-flex justify-content-center">
                                <form onSubmit={ handleSubmit(createCard) } action="#" id="formCreateModal">
                                    <p><strong>Título:</strong></p>
                                    <input onChange={ e => setTitle(e.target.value)} className="form-control mb-2 clear" type="text" placeholder="Reunião" required />
                                    <p><strong>Subtítulo:</strong></p>
                                    <input onChange={ e => setSubTitle(e.target.value)} className="form-control mb-2 clear" type="text" placeholder="Contratar estágiarios" required />
                                    <p><strong>Descrição:</strong></p>
                                    <textarea onChange={ e => setDescription(e.target.value)} className="form-control mb-2 clear" placeholder="Analisar cúrriculos, etc..." required />
                                    <p><strong>Dia:</strong></p>
                                    <input onChange={ e => setDay(e.target.value)} className="form-control mb-2 clear" type="date" name="dateCreateCard" onClick={controlDateField} required />
                                    <p><strong>Hora:</strong></p>
                                    <input onChange={ e => setHour(e.target.value)} className="form-control mb-2 clear" type="time" required />
                                </form>
                            </div>
                        </div>
                        { loading === true ? (
                            <div className="modal-footer">
                                <div className="d-flex justify-content-center my-4">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    <i className="bi bi-x-circle buttonNotItalic"> Fechar</i>            
                                </button>
                                <button type="button" className="btn btn-danger" onClick={clearInputModal}>
                                    <i className="bi bi-eraser-fill buttonNotItalic"> Limpar</i>
                                </button>
                                <button onClick={ createCard } type="submit" className="btn btn-success" data-dismiss="modal" form="formCreateModal">
                                    <i className="bi bi-check-circle buttonNotItalic"> Salvar</i>
                                </button>
                            </div>
                    )}
                    </div>
                </div>
            </div>
            {/*<!-- /Modal -->*/}
        </BodyMain>
    );
}

export default Home;