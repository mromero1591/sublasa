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

library.add(faEnvelope,faCheck,faLock,faExclamationTriangle);

class App extends Component {
  render() {
    return (
      <main>
        <NavBar />
        <SignUpModal />
        {routes}
        <Footer />
      </main>
    );
  }
}

export default App;