import React, {Component} from 'react';
import Button from './../Forms/Button';
import FormInput from './../Forms/FormInput';
import AuthWrapper from './../AuthWrapper';
import {Link} from 'react-router-dom';
import {signInWithGoogle, auth, handleLogin, signInWithFacebook} from './../../firebase/util';
import './styles.scss';


const initialState = {
    email:'',
    password: ''
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };
        this.handleChange = this.handleChange.bind(this);
    }

        handleChange(e){
            const {name, value} = e.target;
            this.setState({
                [name] : value
            })
        }

    handleSubmit = async e => {
        e.preventDefault();
        const {email, password} = this.state;
        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            })
        }catch(err){
            console.log(err)
        }
    }


    render () {
        const {email, password} = this.state;
        const configAuthWrapper = {
            headline: 'Login'
        };
        return (
        <AuthWrapper {...configAuthWrapper}>

                <div className="formWrap">
                    <form onSubmit = {this.handleSubmit}>

                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={this.handleChange}
                        />
                        <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={this.handleChange}
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
}

export default SignIn;