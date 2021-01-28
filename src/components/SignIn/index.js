import React, { useState } from 'react';
import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import {Link, withRouter} from 'react-router-dom';
import {signInWithGoogle, auth, handleLogin, signInWithFacebook} from './../../firebase/util';
import './styles.scss';


const SignIn = props => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const resetForm = () => {
        setEmail('');
        setPassword('');
    }


    const handleSubmit = async e => {
        e.preventDefault();

        try{
            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
            props.history('/');

        }catch(err){
            console.log(err)
        }
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
                                <Button onClick ={signInWithGoogle}>
                                    Sign in with google
                                </Button>
                            </div>
                        </div>
                        <div className="socialSignIn">
                            <div className="row">
                                <Button onClick ={signInWithFacebook}>
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