import React, { Component } from 'react'

//Custom Import
import LandingBanner from '../LandingBanner/LandingBanner';
import SectionDivder from '../SectionDivider/SectionDivider';

//asset import
import chip from '../../../assets/imgs/chip-head.svg';
import monitor from '../../../assets/imgs/monitor-window.svg';
import writePaper from '../../../assets/imgs/write-paper-ink.svg';

export default class LandingPage extends Component {
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
          <button className='button btn-sublasa-primary is-large btn-sublasa-action'> Join </button>
        </section>
      </section>
    )
  }
}