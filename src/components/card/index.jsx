import React from 'react';
import {  MainCards } from './cardCss';

function Card ({ 
    title, 
    subTitle, 
    description, 
    day, 
    hour,
}) {
    return (
        <MainCards>
            <div className="card-header checkboxDivDone d-flex justify-content-start">
                <label htmlFor="priorityCard" className="labelCheckbox">Prioritário:</label>
                <input type="checkbox" name="priorityCard" className="form-switch checkboxHome" />
            </div>
            <div className="card-body" id="mobileView">
                <h5 className="card-title mb-3"><strong>{title}</strong></h5>
                <h6 className="card-subtitle mb-3 text-muted">{subTitle}</h6>
                <p className="card-text">{description}</p>
                <div className="d-flex justify-content-between mb-3" id="containerDateDone1">
                    <small className="isDone"><strong>Data:</strong> {day} - {hour}</small>
                    <div className="checkboxDivDone">
                        <label htmlFor="reminderDone" className="labelCheckbox">Feito:</label>
                        <input type="checkbox" name="isDone" id="reminderDone" className="checkboxHome" /> 
                    </div>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-danger btn-sm">Excluir</button>
                        <button type="button" className="btn btn-primary btn-sm">Editar</button>
                    </div>
                </div>
            </div>
        </MainCards>
    );
}

export default Card;