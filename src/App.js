import React, { Component } from 'react';

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


library.add(faEnvelope,faCheck,faLock,faExclamationTriangle);

class App extends Component {

  componentDidMount() {
    Axios.get('/api/newsletters')
    .then( res => {
      console.log(res);
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

export default App;