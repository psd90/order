import React, {useEffect, useState} from 'react';
import {firestore} from './../../firebase/util';
import './styles.scss'

const CutOff = () => {

    const [date, setDate] = useState([])

    useEffect(() => {   
   firestore
       .collection('date')
       .doc('1KXlQPbP2cxAMiTurXXf')
       .onSnapshot(snapshot => (
           setDate(snapshot.data())
           ))
        }, [])
        
        let s = ''
        if (date.date) {
          s = new Date(date.date.seconds*1000).toLocaleDateString('en-GB')
        }
     const closeWindow = e => {
        e.currentTarget.style.display = 'none'
        
     }
        

    return (
            <div className="cutOff">
                <button onClick={closeWindow}>
                <h1>Please make sure your orders are submitted before the cut-off date below</h1>
                <h3>{s}</h3>
                <h2>Close this window to continue</h2>
                </button>
            </div>
    )
}
export default CutOff