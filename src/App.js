import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import NavBar from './Components/NavBar/NavBar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }
  componentDidMount() {
    Axios.get('/api/articles').then(res => {
      console.log(res);
      this.setState({content: res.data[3].content});
      console.log(res.data[3].content);
      //document.documentElement.innerHTML =  res.data[1].content;
    })
  }
  render() {
    return (
      <div className='Ap'>
        <iframe allowFullScreen='true' srcDoc={this.state.content} id='app-'>
          Test
        </iframe>
      </div>
    );
  }
}

export default App;
