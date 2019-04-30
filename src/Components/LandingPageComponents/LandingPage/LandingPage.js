import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//Custom Import
import LandingBanner from '../LandingBanner/LandingBanner';
import SectionDivder from '../SectionDivider/SectionDivider';
import {updateActiveState, updateType} from '../../../ducks/AuthReducer/AuthReducer';

//asset import
import chip from '../../../assets/imgs/chip-head.svg';
import monitor from '../../../assets/imgs/monitor-window.svg';
import writePaper from '../../../assets/imgs/write-paper-ink.svg';
import custom from '../../../assets/imgs/radio-host.svg';
import request from '../../../assets/imgs/monitor-loading-progress.svg';
import noSpam from '../../../assets/imgs/stamp-document.svg';


class LandingPage extends Component {
  handleauth = (type) => {
    var {signUpActive, updateActiveState, updateType} = this.props;
    var newState = signUpActive ?  false : true;
    updateActiveState(newState);
    updateType(type);
  }

  
  render() {
    return (
      <section className="landingPage">
        <LandingBanner />
        <SectionDivder name='Features' />
        <div className='landing-cards-wrapper container'>
          <div className='box landing-card'>
            <img className='landing-cards-img' src={chip} alt="chip head"/>
            <div className="landing-card-content">
              <h4 className='title is-size-4'>Privacy</h4>
              <p>Never share your email again.</p>
            </div>
          </div>
          <div className='box landing-card'>
            <img className='landing-cards-img' src={monitor} alt="Moniter"/>
            <div className="landing-card-content">
              <h4 className='title is-size-4'>Massive Library</h4>
              <p>Contains any Newsletter you can imagine.</p>
            </div>
          </div>
          <div className='box landing-card'>
            <img className='landing-cards-img' src={writePaper} alt="write paper"/>
            <div className="landing-card-content">
              <h4 className='title is-size-4'>New Weekly</h4>
              <p>New Newsletters are added weekly.</p>
            </div>
          </div>
          <div className='box landing-card'>
            <img className='landing-cards-img' src={custom} alt="custom"/>
            <div className="landing-card-content">
              <h4 className='title is-size-4'>Customizable</h4>
              <p>Subscribe and see only your Favorites.</p>
            </div>
          </div>
          <div className='box landing-card'>
            <img className='landing-cards-img' src={request} alt="request"/>
            <div className="landing-card-content">
              <h4 className='title is-size-4'>Request your Favorites</h4>
              <p>Request any Newsletter you want.</p>
            </div>
          </div>
          <div className='box landing-card'>
            <img className='landing-cards-img' src={noSpam} alt="no spam"/>
            <div className="landing-card-content">
              <h4 className='title is-size-4'>Zero Spam</h4>
              <p>We believe that emails should never be Spam.</p>
            </div>
          </div>
        </div>
        <SectionDivder name='Subscribe' />
        <section className='subscribe-section'>
          <p className=''>Join the largest and most innovative online Newsletter library</p>
          <Link to='auth' onClick={() => {this.handleauth('signup')}} className='button btn-sublasa-primary is-large btn-sublasa-action'> Join </Link>
        </section>
      </section>
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

export default connect(mapStateToProps,mapDispatchToProps)(LandingPage);