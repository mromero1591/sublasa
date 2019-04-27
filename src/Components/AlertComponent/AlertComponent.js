import React, {Component} from 'react';
import {connect} from 'react-redux';

import {updateType, updateEmail, updatePassword} from '../../ducks/AuthReducer/AuthReducer';

class AlertComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userExist: false
        }
    }

    componentDidMount() {
        var message = this.props.message;

        if(message === 'User already exist') {
            this.setState({
                userExist: true
            })
        }
    }

    updateAuth = () => {
        //Purpose: changes the auth from its current type to another.
        //Params: None
        //Return: none.
        //Outcome: type, is update in redux and toggleAuth from parent is called.

        //get all the items from props that are needed.
        var {type, updateType, updateEmail, updatePassword} = this.props;
    
        //check the current type and update them based on the current type.
        var newType = type === 'signup' ? 'login' : 'signup';
    
        //called the functions to change type, email, and password
        updateType(newType);
        updateEmail('');
        updatePassword('');

        this.setState({userExist: false});
        
        //call the toggleAuth function to update error styles.
        this.props.toggleAuth();
    }

    render() {
        return (
            <div className="notification is-danger">
                {this.props.message} { this.state.userExist &&
                    <a onClick={this.updateAuth}>Log in Instead</a>
                }
            </div>
        )
    }
    
}

function mapStateToProps(state) {
    return {
        type: state.Auth.type
    }
}

const mapDispatchToProps = {updateType, updateEmail, updatePassword};

export default connect(mapStateToProps, mapDispatchToProps)(AlertComponent);
