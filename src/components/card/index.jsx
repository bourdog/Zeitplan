import React, { useEffect, useState, memo } from 'react';
import { MainCards } from './cardCss';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';

function Card ({ 
    email,
    title, 
    subTitle, 
    description, 
    day, 
    hour,
    priority,
    isDone,
    isLate,
    id
}) {
    const db = firebase.firestore();
    const dispatch = useDispatch();

    const partsOfDay = day.split("-");
    const partsOfHour = hour.split(":");
    const partsOfDateCard = new Date (
        partsOfDay[0], 
        partsOfDay[1], 
        partsOfDay[2],
        partsOfHour[0],
        partsOfHour[1],
        new Date().getSeconds()
    );

    const [statePriority, setStatePriority] = useState(priority);
    const [stateIsDone, setStateIsDone] = useState(isDone);
    const [stateIsDisabled, setStateIsDisabled] = useState(false);
    const [borderCard, setBorderCard] = useState('none');
    const [isLate, setIsLate] = useState('none');

    const dateFormated = day ? day.split('-').reverse().join('/') : '00/00/0000';

    const priorityCard = () => {

        const isChecked = document.getElementsByName("priorityCard");
        
        isChecked.forEach(element => {
            if(element.checked === true) {
                element.parentNode.classList.add("priorityCard");
            } else {
                element.parentNode.classList.remove("priorityCard");
            }
        });
    }

    const cardIsDone =  async ()  => {
          
        const fullDateNow = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds()
        }
        const partsOfDateNow = new Date(
            fullDateNow.year,
            fullDateNow.month,
            fullDateNow.day,
            fullDateNow.hour,
            fullDateNow.minute,
            fullDateNow.second
        )

        if ( partsOfDateCard.getTime() === partsOfDateNow.getTime() ) {
            alert( `- Lembrete para agora: \n\n${ title }\n ${ subTitle }\n ${ description }` );
        }
        else if ( partsOfDateCard.getTime() < partsOfDateNow.getTime() ) {
            setStateIsDisabled( true );
            setIsLate( 'line-through' );
            if ( stateIsDone === true ) {
                setBorderCard( '3px solid rgb(0, 255, 0)' );
                await db.collection('userCards')
                .doc( id )
            }
            else {
                setBorderCard( '3px solid rgb(255, 0, 0)' );
            }
        } 
        else if ( partsOfDateCard.getTime() > partsOfDateNow.getTime() ) {
            setStateIsDisabled( false );
            setIsLate( 'none' );
            if ( stateIsDone === true ) {
                setBorderCard( '3px solid rgb(0, 255, 0)' );
            }
            else {
                setBorderCard( 'none' );
            }
        }
    }

    const getDataCard = async (id, action) => {
        await db.collection('userCards')
        .doc(id)
        .get()
        .then(() => {
            console.log('card encontrado!');
            if(action === 'update') {
                dispatch({
                    type: 'CARD_UPDATE',
                    email: email,
                    id: id
                });
            } else if(action === 'delete') {
                dispatch({
                    type: 'CARD_DELETE',
                    email: email,
                    id: id
                });
            } else {
                console.log('action de card desconhecida.');
            }
        })
        .catch(err => console.log(err));
    }

    const updateCheckboxPriority = async id => {
        await db.collection('userCards')
        .doc(id)
        .update({
            priority: statePriority ? false : true
        })
        .then(() => console.log('atualizou o priority'))
        .catch(err => console.log('erro ao atualizar checkbox = ',err));
    }

    const updateCheckboxIsDone = async id => {
        await db.collection('userCards')
        .doc(id)
        .update({
            isDone: stateIsDone ? false : true
        })
        .then(() => console.log('atualizou o isDone'))
        .catch(err => console.log('erro ao atualizar checkbox = ',err));
    }

    useEffect(() => {
        setStatePriority(priority);
        setStateIsDone(isDone);
    }, [ priority, isDone ]);

    useEffect(() => {
        priorityCard();
        cardIsDone();
    }, [ statePriority, stateIsDone ]);

    useEffect(() => {
        cardIsDone();

        const fullDateNow = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            second: new Date().getSeconds()
        }
        const partsOfDateNow = new Date(
            fullDateNow.year,
            fullDateNow.month,
            fullDateNow.day,
            fullDateNow.hour,
            fullDateNow.minute,
            fullDateNow.second
        )

        const differenceBetweenDates = partsOfDateCard.getTime() - partsOfDateNow.getTime();

        setTimeout(() => {
            if ( differenceBetweenDates >= 0 ) {
                cardIsDone();
            }
        }, differenceBetweenDates );

    }, [ day, hour ]);

    return (
        <MainCards style={{ border: borderCard ? borderCard : 'none' }}>
            <div className="card-header checkboxDivDone d-flex justify-content-start">
                <label htmlFor="priorityCard" className="labelCheckbox">Prioritário:</label>
                <input 
                    onClick={ () => updateCheckboxPriority(id) } 
                    type="checkbox" 
                    name="priorityCard" 
                    onChange={e => {
                        setStatePriority(e.target.checked);
                        priorityCard();
                    }} 
                    checked={ statePriority } 
                    className="form-switch checkboxHome" 
                />
            </div>
            <div className="card-body" id="mobileView">
                <h5 className="card-title mb-3"><strong>{ title }</strong></h5>
                <h6 className="card-subtitle mb-3 text-muted">{ subTitle }</h6>
                <p className="card-text">{ description }</p>
                <div className="d-flex justify-content-between mb-3" id="containerDateDone1" style={{ textDecoration: isLate ? isLate : 'none' }} >
                    <small className="isDone"><strong>Data:</strong> { dateFormated } - { hour }</small>
                    <div className="checkboxDivDone">
                        <label htmlFor="reminderDone" className="labelCheckbox">Feito:</label>
                        <input 
                            onClick={() => updateCheckboxIsDone(id) } 
                            type="checkbox" 
                            name="isDone" 
                            id="reminderDone" 
                            onChange={ e => {
                                setStateIsDone(e.target.checked);
                                cardIsDone( partsOfDateCard );
                            }}  
                            checked={ stateIsDone } 
                            disabled={ stateIsDisabled }
                            className="checkboxHome" 
                        /> 
                    </div>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-between">
                        <button 
                            onClick={ () => { getDataCard(id, "delete") } } 
                            data-toggle="modal" 
                            data-target="#deleteModal" 
                            type="button" 
                            className="btn btn-danger btn-sm"
                        >
                            Excluir
                        </button>
                        <button 
                            onClick={ () => { getDataCard(id, "update") } } 
                            data-toggle="modal" 
                            data-target="#editModal" 
                            type="button" 
                            className="btn btn-primary btn-sm"
                        >
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </MainCards>
    );
}

export default memo(Card);