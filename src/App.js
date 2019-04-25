import React, { Component } from 'react';

import './App.scss';

//Custom Imports
import NavBar from './Components/NavBar/NavBar';
import routes from './routes';
import Footer from './Components/Footer/Footer';
import SignUpModal from './Components/SignUpModal/SignUpModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpActive: false
    }
  }

  toggleSignUp = () => {
    var signUpState = this.state.signUpActive ? false : true;
    this.setState({signUpActive: signUpState});
  }

  render() {
    return (
      <main>
        <NavBar toggleSignUp={this.toggleSignUp} />
        <SignUpModal toggleSignUp={this.toggleSignUp} active={this.state.signUpActive} />
        {routes}
        <Footer />
      </main>
    );
  }
}

export default App;