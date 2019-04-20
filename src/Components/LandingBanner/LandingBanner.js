import React, { Component } from 'react'

import './LandingBanner.scss';

export default class LandingBanner extends Component {
  render() {
    return (
        <section className='landingbanner hero is-large'>
            <div className="hero-head sublasa-hero-company-name">
                <div className="title has-text-centered">
                    Command Line
                </div>
            </div>
            <div className="columns sublasa-hero-snippet">
                <div className="column is-full"><div className='has-text-centered'>Sniipet here</div></div>
            </div>
            <div className="columns sublasa-hero-body">
                <div className="column">
                    
                </div>
            </div>

        </section>
    )
  }
}
