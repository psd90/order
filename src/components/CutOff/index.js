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
        

    return (
        
            <div className="cutOff">
                
                    <h1>Get your orders in before <br /><br />  {s}</h1>
            
            </div>
        
    )
}
export default CutOff