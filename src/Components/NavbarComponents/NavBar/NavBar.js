import React, { Component } from 'react'
import Axios from 'axios';
import {connect} from 'react-redux';

//custom imports
import AuthSection from '../../AuthSection/AuthSection';
import {updateTopics} from '../../../ducks/newsletterRecudcer/newsletterReduce';
import NavBarLink from '../NavBarLink/NavBarLink';
import NavBarHam from '../NavBarHam/NavBarHam';

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
      this.props.updateTopics(newTopics);
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

  render() {
    //Map through the topics, and create a link for each topic.
    var displayTopics = this.state.topics.map( topic => {
      return(
        <NavBarLink path={`/topics/${topic.name}`} key={topic.id} name={topic.name} />
      );
    })

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <div className='navbar-item' id='navbar-logo-link'>
              <div className='nav-bar-logo'>Sub<span>lasa</span></div>
            </div>
            <NavBarHam toggleMenu={this.handleNavbarMenu} isActive={this.state.isActive}/>
        </div>
      
        <div id="navbarBasicExample" className={`navbar-menu ${this.state.isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <NavBarLink path='/topics/all' name='NewsLetters' />
            {this.props.loggedIn && 
              <NavBarLink path='/newsletters' name='My NewsLetters' />
            }
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable navbar-topics">
              <div className='navbar-link'>Topics</div>
              <div className="navbar-dropdown is-boxed">
                {displayTopics}
              </div>
            </div>
            <div className="navbar-item">
              <AuthSection />
            </div>   
          </div>
        </div>
      </nav> 
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.Auth.loggedIn
  }
}

const mapDispatchToProps = {updateTopics};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);