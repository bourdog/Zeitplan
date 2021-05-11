import React from 'react';
import { ContainerTable } from './tableCss';

function Table ({ cumprir, atrasado, feito, total }) {

    return (
        <ContainerTable>
            <div className="container d-flex flex-column justify-content-center">
                <div className="container" id="diario">
                <div className="container d-flex overview">
                    Overview
                </div>
                    <table className="table table-hover table-responsive-md text-center mt-3">
                        <thead>
                            <tr>
                                <th scope="col" className="aCumprir">Cumprir</th>
                                <th scope="col" className="atrasados">Atrasado</th>
                                <th scope="col" className="jaFeitos">Feito</th>
                                <th scope="col" className="total">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{ cumprir }</td>
                                <td>{ atrasado }</td>
                                <td>{ feito }</td>
                                <td>{ total }</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <td>
                                <i className="bi bi-arrow-up-short"></i>
                            </td>    
                            <td>
                                <i className="bi bi-x"></i>
                            </td>    
                            <td>
                                <i className="bi bi-check2"></i>
                            </td>    
                            <td>
                                <i className="bi bi-fonts"></i>
                            </td>    
                        </tfoot>
                    </table>
                </div>
            </div>
        </ContainerTable>
    );
}

export default Table;