import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

//Custom Import
 
class SubscribedNewsLetters extends Component {
  
  render() {
    var loggedIn = this.props.loggedIn;
    return (
      <div>
        {loggedIn ? (
          <p>Subscribed newsletters</p>
        ) : (
          <Redirect to='/' />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.Auth.loggedIn
  }
}

export default connect(mapStateToProps) (SubscribedNewsLetters);