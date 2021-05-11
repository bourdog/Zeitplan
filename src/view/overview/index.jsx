import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbarSignIn';
import Table from '../../components/table';
import { ContainerOverview, TitlePage } from './overviewCss';
import firebase from 'firebase';
import { useSelector } from 'react-redux';

function Overview () {

    const db = firebase.firestore();
    const emailUser = useSelector( state => state.user.email );

    const [ cumprir, setCumprir ] = useState(0);
    const [ atrasado, setAtrasado ] = useState(0);
    const [ feito, setFeito ] = useState(0);
    const [ total, setTotal ] = useState(0);

    useEffect(() => { 
        const getUserCards = async () => {
            if(emailUser){
                await db.collection('userCards')
                .where('email','==', emailUser)
                .get()
                .then(querySnapshot => {
                    var counter = 0;
                    var done = 0;
                    var late = 0;

                    querySnapshot.forEach(doc => {
                        if ( doc.data().isLate === true ) ++late;
                        if ( doc.data().isDone === true ) ++done;
                        ++counter;
                    });
                    
                    setFeito( done )
                    setAtrasado( late )
                    setTotal( counter );
                    setCumprir( counter - ( done + late ) );
                }).catch(err => console.log(err));
            }
        }
        getUserCards();    
    }, []);

    return (
        <ContainerOverview>
            <Navbar tab="Overview" />
            <TitlePage>
                <Table 
                    cumprir={ cumprir }
                    atrasado={ atrasado }
                    feito={ feito }
                    total={ total }
                />
            </TitlePage>
        </ContainerOverview>
    );
}

export default Overview;