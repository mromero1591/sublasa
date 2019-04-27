import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Axios from 'axios';
import {connect} from 'react-redux';

//custom imports
import {updateActiveState, updateType} from '../../ducks/AuthReducer/AuthReducer';

class NavBar extends Component {

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
      this.setState({
        topics: newTopics,
      });
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

  handleauth = (type) => {
    var {signUpActive, updateActiveState, updateType} = this.props;
    var newState = signUpActive ?  false : true;
    updateActiveState(newState);
    updateType(type);
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

             <button onClick={this.handleNavbarMenu} className={`button is-white navbar-burger burger ${this.state.isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
        </div>
      
        <div id="navbarBasicExample" className={`navbar-menu ${this.state.isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link to={`/topics/all`} className="navbar-item navbar-sublasa-item">NewsLetters</Link>
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
                <li onClick={() => {this.handleauth('signup')}} className="button btn-sublasa btn-sublasa-primary">
                  Sign up
                </li>
                <li onClick={() => {this.handleauth('login')}} className="button btn-sublasa btn-sublasa-secondary">
                  Log in
                </li>
              </div>
            </div>   
          </div>
        </div>
      </nav> 
    )
  }
}

function mapStateToProps(state) {
  return {
    signUpActive: state.Auth.signUpActive,
    type: state.Auth.type
  }
}

const mapDispatchToProps = {updateActiveState, updateType};

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);