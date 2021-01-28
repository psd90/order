import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import './styles.scss';
import {auth, handleUserProfile} from './../../firebase/util'
import FormInput from './../Forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import Button from './../Forms/Button';

    const Signup = props => {
    
        const [displayName, setDisplayName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setComfirmPassword] = useState('');
        const [errors, setErrors] = useState([]);
        const resetForm = () => {
            setDisplayName('');
            setEmail('');
            setPassword('');
            setComfirmPassword('');
            setErrors([]);
        }
   
    const handleFormSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword){
            const err = ['Your passwords do not match'];
            setErrors(err);
            return;
        }
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, {displayName});
            resetForm();
            props.history.push('/');
            
        }catch(err){
            console.log(err)
        }
    }

        const configAuthWrapper = {
            headline: 'Registration'
        }
        return (
            <AuthWrapper {...configAuthWrapper}>
                        

                    <div className="formWrap">
                        {errors.length > 0  && (
                            <ul>
                                {errors.map((err, index) => {
                                    return (
                                        <li key={index}>
                                            {err}
                                        </li>
                                    )
                                })}
                            </ul>
                        )} 
                    <form onSubmit={handleFormSubmit}>
                        <FormInput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={e => setDisplayName(e.target.value)}
                        />
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
                        <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={e => setComfirmPassword(e.target.value)}
                        />
                        <Button type="submit">
                            Register
                        </Button>
                    </form>
                    </div>
            </AuthWrapper>
        );
    }


export default withRouter(Signup);