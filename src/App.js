import React, { Component } from 'react';
import {connect} from 'react-redux';
import { faEnvelope,faCheck,faLock, faExclamationTriangle, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Axios from 'axios';
import './App.scss';

//Custom Imports
import NavBar from './Components/NavBar/NavBar';
import routes from './routes';
import Footer from './Components/Footer/Footer';

import {updateLoggedIn} from './ducks/AuthReducer/AuthReducer';
import {updateSubscribed, updateNewsLetters} from './ducks/newsletterRecudcer/newsletterReduce';

library.add(faEnvelope,faCheck,faLock,faExclamationTriangle,faSignInAlt, faSignOutAlt, faUserPlus);


class App extends Component {

  componentDidMount() {
    Axios.get('/api/newsletters')
    .then( res => {
      this.props.updateNewsLetters(res.data.newsletters);
      if(res.data.loggedIn) {
        this.props.updateLoggedIn(res.data.loggedIn);
        Axios.get('/api/subscribed/newsletters')
        .then( res => {
          this.props.updateSubscribed(res.data);
        }).catch(err => {
          console.log('error in getting subscribed newsletters from App', err);
        });
      }      
    }).catch(err => {
      console.log('erro in app get:', err);
    })
  }

  render() {
    return (
      <main>
        <NavBar />
        {routes}
        <Footer />
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.Auth.loggedIn
  }
}

const mapDispatchToProps = {updateLoggedIn, updateSubscribed,updateNewsLetters}

export default connect(mapStateToProps, mapDispatchToProps)(App);