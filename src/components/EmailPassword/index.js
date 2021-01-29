import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './styles.scss'
import {resetPassword, resetAuthForms} from './../../redux/User/user.actions';
import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';



const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const EmailPassword = props => {
    const {resetPasswordSuccess, resetPasswordError} = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess) {
            dispatch(resetAuthForms());
            props.history.push('/login');
        }
    }, [resetPasswordSuccess])


    useEffect(() => {
        if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setErrors(resetPasswordError);
        }
    }, [resetPasswordError]);

    


   const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword({email}));
        
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

 
export default withRouter(EmailPassword);