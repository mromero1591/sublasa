import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.scss';

//Custom Imports
import NavBar from './Components/NavBar/NavBar';
import routes from './routes';
import Footer from './Components/Footer/Footer';
import SignUpModal from './Components/SignUpModal/SignUpModal';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope,faCheck,faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import {updateLoggedIn} from './ducks/AuthReducer/AuthReducer';

library.add(faEnvelope,faCheck,faLock,faExclamationTriangle);

class App extends Component {

  componentDidMount() {
    Axios.get('/api/newsletters')
    .then( res => {
      if(res.data.loggedIn) {
        this.props.updateLoggedIn(res.data.loggedIn);
      }
      console.log(res.data);
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

const mapDispatchToProps = {updateLoggedIn}

export default connect(mapStateToProps, mapDispatchToProps)(App);