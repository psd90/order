import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './styles.scss'
import {resetUserState, resetPasswordStart} from './../../redux/User/user.actions';
import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';



const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});

const EmailPassword = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {resetPasswordSuccess, userErr} = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/success');
        }
    }, [resetPasswordSuccess])


    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr]);

    


   const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPasswordStart({email}));
        
    }

    
       

        const configAuthWrapper = {
            headline: 'Reset Password with Email'
        };
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((e, index) => {
                                return (
                                    <li key={index}>
                                        {e}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    <form onSubmit={handleSubmit}>

                        <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Your Email"
                        handleChange={e => setEmail(e.target.value)}
                        />
                        <Button type="submit">Reset Password</Button>
                    </form>
                </div>
            </AuthWrapper>
        )
    }

 
export default EmailPassword;