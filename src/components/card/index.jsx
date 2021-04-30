import React, { useState } from 'react';
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
    isDoneCard,
    id
}) {
    const db = firebase.firestore();
    const dispatch = useDispatch();


    const updateCard = id => {
        db.collection('userCards')
        .doc(id)
        .get()
        .then(result => {
            dispatch({
                type: 'CARD',
                email: email,
                title: result.data().title,
                subTitle: result.data().subTitle,
                description: result.data().description,
                day: result.data().day,
                hour: result.data().hour,
                priority: result.data().priority,
                isDoneCard: result.data().isDoneCard
            })
        })
        .catch(err => console.log(err));
    }

    return (
        <MainCards>
            <div className="card-header checkboxDivDone d-flex justify-content-start">
                <label htmlFor="priorityCard" className="labelCheckbox">Prioritário:</label>
                <input type="checkbox" name="priorityCard" checked={priority} className="form-switch checkboxHome" />
            </div>
            <div className="card-body" id="mobileView">
                <h5 className="card-title mb-3"><strong>{title}</strong></h5>
                <h6 className="card-subtitle mb-3 text-muted">{subTitle}</h6>
                <p className="card-text">{description}</p>
                <div className="d-flex justify-content-between mb-3" id="containerDateDone1">
                    <small className="isDone"><strong>Data:</strong> {day} - {hour}</small>
                    <div className="checkboxDivDone">
                        <label htmlFor="reminderDone" className="labelCheckbox">Feito:</label>
                        <input type="checkbox" name="isDone" id="reminderDone" checked={isDoneCard} className="checkboxHome" /> 
                    </div>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-danger btn-sm">Excluir</button>
                        <button onClick={ updateCard(id) } data-toggle="modal" data-target="#createModal2" type="button" className="btn btn-primary btn-sm">Editar</button>
                    </div>
                </div>
            </div>
        </MainCards>
    );
}

export default Card;