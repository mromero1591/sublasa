import React, { Component } from 'react'

//Custom Import
import './LandingPage.scss'
import LandingBanner from '../LandingBanner/LandingBanner';

export default class LandingPage extends Component {
  render() {
    return (
      <section className="landingPage">
          <LandingBanner />
      </section>
    )
  }
}
