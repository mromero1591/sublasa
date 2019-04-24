import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      topics: []
    }
  }

  componentDidMount() {
    //Purpose: When compent mounts set state for topics.
    //Params: none
    //returns: none
    //outcome: topics state is update to include all topics from database.

    //make a call to the database for topics.
    Axios.get('/api/topics')
    .then(res => {
      //if a topic is returned then set topics on state.
      var newTopics = res.data;
      this.setState({topics: newTopics});
    }).catch(err => {
      //if there is an error in getting the topics then console the error.
      console.log('error faced in getting topics', err);
    })
  }

  handleNavbarMenu = () => {
    //Purpose: toogle the menu from showing to not.
    //Params: none
    //returns: none
    //outcome: state is updated to display if the menu is showing or not.

    //toogle state based on current state.
    var newIsActive = this.state.isActive ? false : true;
    this.setState({
      isActive: newIsActive
    })
  }

  render() {

    //Map through the topics, and create a link for each topic.
    var displayTopics = this.state.topics.map( topic => {
      return(
        <Link to={`/topics/${topic.name}`} className="navbar-item" key={topic.id}>{topic.name}</Link>
      );
    })
    
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
             <Link to='/' className='navbar-item' id='navbar-logo-link'>
               <div className='nav-bar-logo'>Sub<span>lasa</span></div>
             </Link>

             <a onClick={this.handleNavbarMenu} role="button" className={`navbar-burger burger ${this.state.isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
        </div>
      
        <div id="navbarBasicExample" className={`navbar-menu ${this.state.isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link to='/' className="navbar-item navbar-sublasa-item">NewsLetter</Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable navbar-topics">
              <Link to='#' className='navbar-link'>Topics</Link>
              <div className="navbar-dropdown is-boxed">
                {displayTopics}
              </div>
            </div>

            <div className="navbar-item">
              <div className="buttons">
                <Link to='/' className="button btn-sublasa btn-sublasa-primary">
                  Sign up
                </Link>
                <Link to='/' className="button btn-sublasa btn-sublasa-secondary">
                  Log in
                </Link>
              </div>
            </div>   
          </div>
        </div>
      </nav> 
    )
  }
}