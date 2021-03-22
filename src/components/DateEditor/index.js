import React, {useState} from 'react';
import {firestore} from '../../firebase/util';
import DatePicker from 'react-datepicker';
import Button from './../../components/Forms/Button';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';
import {useHistory} from 'react-router-dom';

//date selector will need manually setting up 

const DateEditor = () => {
    const [selectedDate, setSelectedDate] = useState(null)
    const history = useHistory();

 // in here make the doc reference applied to the one doc('in here')
const handleSubmit = e => {
    e.preventDefault();
    firestore.collection('date').doc('1KXlQPbP2cxAMiTurXXf').set({date: selectedDate})
}

return(
    <div>
        <p>
            Click on the empty box below
        </p>
    <div className="selectDate">
        <form onSubmit={handleSubmit}>

        <DatePicker 
        selected={selectedDate} 
        onChange={date => setSelectedDate(date)} 
        dateFormat = 'dd/MM/yyyy'
        minDate ={new Date}
        isClearable
        />
        <br /><br />
        <Button type="submit">
              Set New Date
            </Button>
        </form>
    </div>
    


    </div>
)
}


export default DateEditor