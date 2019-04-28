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
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-vertical">
              <div className=" tile is-parent split-tiles">
                <div className="tile is-4 is-child feature-section-item">
                  <img className='' src={chip} alt="chip head"/>
                  <p className='title'>Privacy</p>
                  <p className='subtitle'>Never Share your email again.Subscribe with privacy.</p>
                </div>
                <div className="tile is-4 is-child  feature-section-item">
                  <img className='' src={monitor} alt="chip head"/>
                  <p className='title'>Central Location</p>
                  <p className='subtitle'>Never Share your email again.Subscribe with privacy.</p>
                </div>
              </div>
              <div className="tile is-parent center-tile">
                <div className="tile is-4 is-child  feature-section-item">
                  <img className='' src={writePaper} alt="chip head"/>
                  <p className='title'>Privacy</p>
                  <p className='subtitle'>Never Share your email again.Subscribe with privacy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SectionDivder name='Subscribe' />
        <section className='subscribe-section'>
          <p className=''>Join the Largest and Most Innovative Newsletter</p>
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
