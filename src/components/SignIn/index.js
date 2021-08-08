import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import {emailSignInStart} from './../../redux/User/user.actions';
import {emailSignIn} from './../../redux/User/user.sagas';
import {Link, useHistory} from 'react-router-dom';
import './styles.scss';




const mapState = ({user}) => ({
    currentUser: user.currentUser
})

const SignIn = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser} = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    useEffect(() => {
        if (currentUser){
            resetForm();
            history.push('/');
        }
    }, [currentUser]);
    
    const resetForm = () => {
        setEmail('');
        setPassword('');
    } 


    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({email, password}));   
    }
        const configAuthWrapper = {
            headline: 'Login'
        };
        return (
            
            <AuthWrapper {...configAuthWrapper}>
                <div className="formWrap">
                    <form onSubmit = {handleSubmit}>

                        <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                        />
                        <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                        />
                        <Button type="submit">
                            LogIn
                        </Button>
                        <div className="links">
                            <Link to="/recovery">
                                Forgot your password?
                            </Link>
                        </div>
                    </form>
                    <div className="links">
                        Don't have an account?
                        <div className="signUp">
                        <Button onClick={() => history.push('/registration')}>
                            SignUp
                        </Button>
                        </div>
                    </div>
                </div>
             </AuthWrapper>
    );
}


export default SignIn;