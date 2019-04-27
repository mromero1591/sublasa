import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

//Custom Import
import NewsletterSectionDivider from '../NewsletterSectionDivider/NewsletterSectionDivider';
import NewsletterArticleContainer from '../NewsletterArticleContainer/NewsletterArticleContainer';

import Axios from 'axios';

class SubscribedNewsLetters extends Component {  
  constructor(props){
    super(props);
    this.state = {
      subscribedNewsLetters: []
    }
  }
  componentDidMount() {
    Axios.get('/api/subscribed/newsletters')
    .then( res => {
      this.setState({
        subscribedNewsLetters: res.data
      })
    })
  }
  render() {
    var loggedIn = this.props.loggedIn;
    var displayNewsLetters = this.state.subscribedNewsLetters.map( (newsletter) => {
      return (
          <div key={newsletter.id} className="section">
              <NewsletterSectionDivider name={newsletter.name}/>
              <NewsletterArticleContainer section='subscribed' newsletter={newsletter}/>
          </div>
      );
    });
    return (
      <div>
        {loggedIn ? (
          <section className='container'>
                <div className="section">
                    <h1 className='title is-uppercase'>My NewsLetters</h1>
                </div>
                {displayNewsLetters}
          </section>
        ) : (
          <Redirect to='/' />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.Auth.loggedIn
  }
}

export default connect(mapStateToProps) (SubscribedNewsLetters);