import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {updateActiveState, updateType, updateLoggedIn} from '../../ducks/AuthReducer/AuthReducer';
import {updateSubscribed} from '../../ducks/newsletterRecudcer/newsletterReduce';
import Axios from 'axios';

class AuthSection extends Component {

    handleauth = (type) => {
        var {signUpActive, updateActiveState, updateType} = this.props;
        var newState = signUpActive ?  false : true;
        updateActiveState(newState);
        updateType(type);
    }

    handleLogout = () => {
        //update loggedin details
        this.props.updateLoggedIn(false);

        //call the logout endpoint
        Axios.get('/auth/logout')
        .then( res => {
            this.props.updateSubscribed([]);
        }).catch( err => {
            console.log('erro in loggin out', err);
        })
    }

    render() {
        var {loggedIn} = this.props;
        return (
            <div className='auth-section'>
                {!loggedIn ? (
                    <div className="buttons">
                        <Link to='/auth' onClick={() => {this.handleauth('signup')}} className="button btn-sublasa btn-sublasa-primary">
                        <FontAwesomeIcon icon='user-plus' /> Sign up
                        </Link>
                        <Link to='/auth' onClick={() => {this.handleauth('login')}} className="button btn-sublasa btn-sublasa-secondary">
                        <FontAwesomeIcon icon="sign-in-alt" /> Log in
                        </Link>
                    </div>
                ) : (
                    <Link to='/' onClick={this.handleLogout} className="button btn-sublasa btn-sublasa-secondary">
                    <FontAwesomeIcon icon="sign-out-alt" /> Log Out
                    </Link>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      signUpActive: state.Auth.signUpActive,
      type: state.Auth.type,
      loggedIn: state.Auth.loggedIn
    }
  }

const mapDispatchToProps = {updateActiveState, updateType, updateLoggedIn,updateSubscribed};

export default connect(mapStateToProps,mapDispatchToProps)(AuthSection);