import React, {useEffect} from 'react';
import {firestore} from '../../firebase/util'
import './styles.scss';



const DateEditor = () => {


// useEffect(()=> {
//     firestore.collection('date').doc().set()
// })



return(
    <div>
        <p>
            Make a date selector to push a new cut-off date to firebase 'date' collection deleting the current cut off date
        </p>
        <br></br>
        <p>
           When posting a new Cut Off Date it will delete all orders
        </p>
    </div>
)
}
export default DateEditor