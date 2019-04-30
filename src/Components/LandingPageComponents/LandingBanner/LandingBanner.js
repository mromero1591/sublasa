import React, { Component } from 'react'

export default class LandingBanner extends Component {
  render() {
    return (
      <section className="hero is-large">
        <div className="hero-body">
          <div className="container landing-content">
            <h1 className="title">
              The First Online Newsletter Library
            </h1>
            <h2 className="subtitle">Enjoy an unlimited number of Newsletters for FREE.</h2>
          </div>
        </div>
      </section>
    )
  }
}
