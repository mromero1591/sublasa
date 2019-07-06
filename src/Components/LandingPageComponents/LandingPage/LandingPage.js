import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//Custom Import
import LandingBanner from '../LandingBanner/LandingBanner';
import SectionDivder from '../SectionDivider/SectionDivider';
import {updateActiveState, updateType} from '../../../ducks/AuthReducer/AuthReducer';
import LandingPageImgCard from '../LandingPageImgCard'

//asset import
import chip from '../../../assets/imgs/chip-head.svg';
import monitor from '../../../assets/imgs/monitor-window.svg';
import writePaper from '../../../assets/imgs/write-paper-ink.svg';
import custom from '../../../assets/imgs/radio-host.svg';
import request from '../../../assets/imgs/monitor-loading-progress.svg';
import noSpam from '../../../assets/imgs/stamp-document.svg';

const handleauth = (type) => {
  var {signUpActive, updateActiveState, updateType} = this.props;
  var newState = signUpActive ?  false : true;
  updateActiveState(newState);
  updateType(type);
}

function LandingPage() {
  return (
    <section className="landingPage">
      <LandingBanner />
      <SectionDivder name='Features' />
      <div className='landing-cards-wrapper container'>
        <LandingPageImgCard title="Privacy" image={chip} text="Never share your email again."/>
        <LandingPageImgCard title="Massive Library" image={monitor} text="Contains any Newsletter you can imagine."/>
        <LandingPageImgCard title="New Weekly" image={writePaper} text="New Newsletters are added weekly."/>
        <LandingPageImgCard title="Customizable" image={custom} text="Subscribe and see only your Favorites."/>
        <LandingPageImgCard title="Request your Favorites" image={request} text="Request any Newsletter you want."/>
        <LandingPageImgCard title="Zero Spam" image={noSpam} text="We believe that emails should never be Spam."/>
      </div>
      <SectionDivder name='Subscribe' />
      <section className='subscribe-section'>
        <p className=''>Join the largest and most innovative online Newsletter library</p>
        <Link to='auth' onClick={() => {handleauth('signup')}} className='button btn-sublasa-primary is-large btn-sublasa-action'> Join </Link>
      </section>
    </section>
  )  
}

function mapStateToProps(state) {
  return {
    signUpActive: state.Auth.signUpActive,
    type: state.Auth.type
  }
}

const mapDispatchToProps = {updateActiveState, updateType};

export default connect(mapStateToProps,mapDispatchToProps)(LandingPage);