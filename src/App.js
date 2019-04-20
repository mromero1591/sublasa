import React, { Component } from 'react';

import './App.scss';
import Axios from 'axios';


//Custom Imports
import NavBar from './Components/NavBar/NavBar';
import routes from './routes';
import Footer from './Components/Footer/Footer';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: 'open'
    };
  }
  componentDidMount() {
    Axios.get('/api/articles').then(res => {
      console.log(res);
      this.setState({content: res.data[3].content});
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