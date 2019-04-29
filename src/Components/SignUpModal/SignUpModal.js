import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux';
import Axios from 'axios';
import {Link} from 'react-router-dom';
//custom imports
import {updateActiveState, updateType, updateEmail, updatePassword, updateLoggedIn} from '../../ducks/AuthReducer/AuthReducer';
import AlertComponent from '../AlertComponent/AlertComponent';

class SignUpModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validEmail: false,
            invalidEmailLogin: false, 
            invalidPasswordLogin: false,
            errorMessage: '',
            showErroMessage: false,
            loggingIn: false
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.email !== prevProps.email) {
            this.setState({showErroMessage: false, errorMessage: ''});
        }
    }

    handleEmailInput = (value) => {
        //Purpose: update redux state when email input is changed.
        //Params: string - the current value typed in
        //Return: None
        //Outcome: redux state is updated and email is checked to make sure its valid
        this.validateEmail(value);
        this.props.updateEmail(value);
    }

    handlePasswordInput = (value) => {
        //Purpose: update redux state when password input is changed.
        //Params: string - the current value typed in
        //Return: None
        //Outcome: redux state is updated. current state is updated.

        //incase current invalid password is set then update to remove validation.
        if(this.state.invalidPasswordLogin) {
            this.setState({
                invalidPasswordLogin: false
            })
        }
        
        this.props.updatePassword(value);
    }

    validateEmail = (emailStr) => {
        //Purpose: checks to valid the email input
        //Params: string - the current email value
        //Return: None
        //Outcome: change state based on if email is valid or not.

        //create a mail form with regex.
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        //check if the current email is valid or not, then update state accordingly.
        if(emailStr.match(mailformat)) {
            this.setState({
                validEmail: true,
                invalidEmailLogin: false
            });
        } else {
            this.setState({
                validEmail: false,
                invalidEmailLogin: false
            });
        }
        return;
    }

    runAuth = () => {
        //Purpose: runs the auth for login and sign up.
        //Params: none
        //Return: none
        //Outcome: login or register is done, and state is updated.

        //grab the items needed from props.
        var {email, password, type, updateEmail, updatePassword} = this.props;

        //check if email or password is empty. if so add invalid to email and password.
        if( email === '' && password === '') {
            this.setState({
                invalidEmailLogin: true,
                invalidPasswordLogin: true
            });
        } else if(!this.state.validEmail) { //if email is invalid then show the email error.
            this.setState({invalidEmailLogin: true})
        } else if (password === '') { //if the password is empyt then show the invalid password.
            this.setState({invalidPasswordLogin: true});
        } else { //if both fields are valid then run the auth based on type.
            if(type === 'signup') { //if type is sign up then register the new user.
                //run sign up code.
                this.runRegsitration();
                this.runUserAuth('/auth/register');
            } else {
                //run login code.
                //this.runLogin();
                this.runUserAuth('/auth/login');
            }
            updateEmail('');
            updatePassword('');
        }
    }

    runUserAuth = (endPoint) => {
        //Purpose: runs the auth for login or regsiter.
        //Params: none
        //Return: none
        //Outcome: user is added to redux sucessfully if user exist, else error is given.
        var {email, password } = this.props;
        Axios.post(`${endPoint}`, {username: email, email: email, password: password})
        .then( res => {
            this.handleSucessfulAuth();    
        }).catch( err => {
            this.handleErrorAuth(err.response.data.message);
        });

        this.setState({loggingIn: true});
    }
    
    toggleAuth = (currentType) => {
        this.setState({
            validEmail: false,
            invalidEmailLogin: false,
            invalidPasswordLogin: false,
            errorMessage: '',
            showErroMessage: false
        })
    }

    handleSucessfulAuth = () => {
        
        //update sign up data after sucessfull login
        this.props.updateLoggedIn(true);
        //redirect to the newsletter section.
        this.props.history.push('/newsletters'); 
    }

    handleErrorAuth = (message) => {
        //update state to show the error message.
        this.setState({
            errorMessage: message,
            showErroMessage: true,
            validEmail: false,
            invalidEmailLogin: false,
            invalidPasswordLogin: false,
            loggingIn: false,
        })
    }

    render() {

        return(
            <div className={`modal ${this.props.signUpActive ? 'is-active is-clipped' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <section className="modal-card-body authentication-modal">
                        {this.state.showErroMessage &&
                            <AlertComponent toggleAuth={this.toggleAuth} message={this.state.errorMessage} />
                        }
                        <div className='nav-bar-logo has-text-centered'>Sub<span>lasa</span></div>
                        {this.state.loggingIn ? (
                                <div className="section">
                                    <h3>Loggin In</h3>
                                    <progress className="progress is-small is-primary" max="100">60%</progress>
                                </div>
                            ) : (
                                <div className="section">   
                                    <div className="field">
                                        <p className="control has-icons-left has-icons-right">
                                            <input value={this.props.email} onChange={ (e) => {this.handleEmailInput(e.target.value)}} className="input" type="email" placeholder="Email" />
                                            <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon="envelope" />
                                            </span>
                                            <span className="icon is-small is-right">
                                                {this.state.validEmail &&
                                                    <FontAwesomeIcon icon='check' className='valid-check' />
                                                }
                                            </span>
                                            {/* <FontAwesomeIcon icon="exclamation-triangle" /> */}
                                        </p>
                                        {this.state.invalidEmailLogin &&
                                            <p className="help is-danger">This email is invalid</p>
                                        }
                                    </div>
                                    <div className="field">
                                        <p className="control has-icons-left">
                                            <input value={this.props.password} onChange={ (e) => {this.handlePasswordInput(e.target.value)}} className="input" type="password" placeholder="Password" />
                                            <span className="icon is-small is-left">
                                            <FontAwesomeIcon icon="lock" />
                                            </span>
                                        </p>
                                        {this.state.invalidPasswordLogin &&
                                            <p className="help is-danger">This password is invalid</p>
                                        }
                                    </div>
                                </div>
                            )}
                        <div className="modal-button-container">
                            <li onClick={() => {this.runAuth()}} className="button btn-sublasa btn-sublasa-primary">{this.props.type === 'signup' ? 'Join' : 'Login' }</li>
                            <Link to='/' onClick={() => {this.props.updateActiveState(false)}} className="button btn-sublasa btn-sublasa-secondary">Cancel</Link>
                        </div>
                    </section>
                </div>
            </div>
        )
    }


}

function mapStateToProps(state) {
    var {signUpActive, type, email, password} = state.Auth;

    return {
      signUpActive: signUpActive,
      type: type,
      email: email,
      password: password 
    }
}
  
const mapDispatchToProps = {updateActiveState, updateType, updateEmail, updatePassword,updateLoggedIn};

export default connect(mapStateToProps,mapDispatchToProps)(SignUpModal);