import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import {emailSignInStart, googleSignInStart, facebookSignInStart} from './../../redux/User/user.actions';
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

    const handleGoogleSignIn= () => {
        dispatch(googleSignInStart());
    }

    const handleFacebookSignIn = () => {
        dispatch(facebookSignInStart());
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


                        <div className="socialSignIn">
                            <div className="row">
                                <Button onClick ={handleGoogleSignIn}>
                                    Sign in with google
                                </Button>
                            </div>
                        </div>
                        <div className="socialSignIn">
                            <div className="row">
                                <Button onClick ={handleFacebookSignIn}>
                                    Sign in with facebook
                                </Button>
                            </div>
                        </div>

                    </form>
                </div>
             </AuthWrapper>
    );
}


export default SignIn;