import React, { Component } from 'react';

import './App.scss';
import Axios from 'axios';
import {connect} from 'react-redux';

//Custom Imports
import NavBar from './Components/NavBar/NavBar';
import routes from './routes';
import Footer from './Components/Footer/Footer';
import {updateNewsLetters} from './ducks/newsletterRecudcer/newsletterReduce';

class App extends Component {

  componentDidMount() {
    Axios.get('/api/newsletters').then(res => {
      this.props.updateNewsLetters(res.data);
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

const mapDisptachToProps = {updateNewsLetters};

export default connect(null,mapDisptachToProps)(App);