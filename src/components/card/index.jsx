import React, { useEffect, useState } from 'react';
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
    id
}) {
    const db = firebase.firestore();
    const dispatch = useDispatch();
    
    const [statePriority, setStatePriority] = useState(priority);
    const [stateIsDone, setStateIsDone] = useState(isDone);

    const priorityCard = () => {

        var isChecked = document.getElementsByName("priorityCard");
        
        for(var i = 0; i < isChecked.length; i++){
            if(isChecked[i].checked == true) {
                isChecked[i].parentNode.classList.add("priorityCard");
            } else {
                isChecked[i].parentNode.classList.remove("priorityCard");
            }
        }
        
    }

    const cardIsDone = () => {

        var isDone = document.getElementsByName("isDone");
        
        for(var i = 0; i < isDone.length; i++){
            if(isDone[i].checked == true) {
                isDone[i].parentNode.parentNode.classList.add("addIsDone");
            } else {
                isDone[i].parentNode.parentNode.classList.remove("addIsDone");
            }
        }
        
    }

    const getDataCard = id => {
        db.collection('userCards')
        .doc(id)
        .get()
        .then(result => {
            dispatch({
                type: 'CARD',
                email: email,
                id: id,
                title: result.data().title,
                subTitle: result.data().subTitle,
                description: result.data().description,
                day: result.data().day,
                hour: result.data().hour,
                priority: result.data().priority,
                isDone: result.data().isDone,
                isUpdate: true
            })
        })
        .catch(err => console.log(err));
    }

    const updateCheckboxPriority = id => {
        db.collection('userCards')
        .doc(id)
        .update({
            priority: statePriority ? false : true
        })
        .then(() => console.log('atualizou o priority'))
        .catch(err => console.log('erro ao atualizar checkbox = ',err));
    }

    const updateCheckboxIsDone = id => {
        db.collection('userCards')
        .doc(id)
        .update({
            isDone: stateIsDone ? false : true
        })
        .then(() => console.log('atualizou o isDone'))
        .catch(err => console.log('erro ao atualizar checkbox = ',err));
    }

    useEffect(() => {
        priorityCard();
        cardIsDone();
    },[]);

    return (
        <MainCards>
            <div className="card-header checkboxDivDone d-flex justify-content-start">
                <label htmlFor="priorityCard" className="labelCheckbox">Prioritário:</label>
                <input 
                    onClick={() => updateCheckboxPriority(id) } 
                    type="checkbox" 
                    name="priorityCard" 
                    onChange={e => {
                        setStatePriority(e.target.value);
                        priorityCard();
                    }} 
                    defaultChecked={ statePriority } 
                    className="form-switch checkboxHome" 
                />
            </div>
            <div className="card-body" id="mobileView">
                <h5 className="card-title mb-3"><strong>{title}</strong></h5>
                <h6 className="card-subtitle mb-3 text-muted">{subTitle}</h6>
                <p className="card-text">{description}</p>
                <div className="d-flex justify-content-between mb-3" id="containerDateDone1">
                    <small className="isDone"><strong>Data:</strong> {day} - {hour}</small>
                    <div className="checkboxDivDone">
                        <label htmlFor="reminderDone" className="labelCheckbox">Feito:</label>
                        <input 
                            onClick={() => updateCheckboxIsDone(id) } 
                            type="checkbox" 
                            name="isDone" 
                            id="reminderDone" 
                            onChange={e => {
                                setStateIsDone(e.target.value);
                                cardIsDone();
                            }}  
                            defaultChecked={ stateIsDone } 
                            className="checkboxHome" 
                        /> 
                    </div>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-danger btn-sm">Excluir</button>
                        <button onClick={ () => { getDataCard(id) } } data-toggle="modal" data-target="#editModal" type="button" className="btn btn-primary btn-sm">Editar</button>
                    </div>
                </div>
            </div>
        </MainCards>
    );
}

export default Card;