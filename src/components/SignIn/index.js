import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import {signInUser, signInWithFacebook, signInWithGoogle, resetAuthForms} from './../../redux/User/user.actions';
import {Link, withRouter} from 'react-router-dom';
import './styles.scss';

const mapState = ({user}) => ({
    signInSuccess: user.signInSuccess
})
const SignIn = props => {
    const {signInSuccess} = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    useEffect(() => {
        if (signInSuccess){
            resetForm();
            dispatch(resetAuthForms());
            props.history.push('/');
        }
    }, [signInSuccess]);
    
    const resetForm = () => {
        setEmail('');
        setPassword('');
    } 


    const handleSubmit = async e => {
        e.preventDefault();
        dispatch(signInUser({email, password}));
            
    }

    const handleSignInGoogle = () => {
        dispatch(signInWithGoogle());
    }

    const handleSignInFacebook = () => {
        dispatch(signInWithFacebook());
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
                                <Button onClick ={handleSignInGoogle}>
                                    Sign in with google
                                </Button>
                            </div>
                        </div>
                        <div className="socialSignIn">
                            <div className="row">
                                <Button onClick ={handleSignInFacebook}>
                                    Sign in with facebook
                                </Button>
                            </div>
                        </div>

                    </form>
                </div>
             </AuthWrapper>
    );
}


export default withRouter(SignIn);