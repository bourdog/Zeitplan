import React from 'react';

function Table ({ cumprir, atrasado, feito, total }) {
    return (
        <div class="container d-flex flex-column justify-content-center">
            <div class="container tabContent" id="diario">
                <table class="table table-hover table-responsive-md text-center mt-3">
                    <thead>
                        <tr>
                            <th scope="col" class="aCumprir">Cumprir</th>
                            <th scope="col" class="atrasados">Atrasado</th>
                            <th scope="col" class="jaFeitos">Feito</th>
                            <th scope="col" class="total">Total</th>
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
                            <i class="bi bi-arrow-up-short"></i>
                        </td>    
                        <td>
                            <i class="bi bi-x"></i>
                        </td>    
                        <td>
                            <i class="bi bi-check2"></i>
                        </td>    
                        <td>
                            <i class="bi bi-fonts"></i>
                        </td>    
                    </tfoot>
                    </table>
            </div>
        </div>
    );
}

export default Table;