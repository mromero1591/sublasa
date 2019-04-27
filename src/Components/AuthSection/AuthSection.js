import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import {updateActiveState, updateType, updateLoggedIn} from '../../ducks/AuthReducer/AuthReducer';
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
            console.log(res);
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
                        Sign up
                        </Link>
                        <Link to='/auth' onClick={() => {this.handleauth('login')}} className="button btn-sublasa btn-sublasa-secondary">
                        Log in
                        </Link>
                    </div>
                ) : (
                    <div className="buttons">
                        <Link to='/' onClick={this.handleLogout} className="button btn-sublasa btn-sublasa-secondary">
                        Log Out
                        </Link>
                    </div>
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

const mapDispatchToProps = {updateActiveState, updateType, updateLoggedIn};

export default connect(mapStateToProps,mapDispatchToProps)(AuthSection);