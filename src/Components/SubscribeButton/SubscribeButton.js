import React, { Component } from 'react'

class SubscribeButton extends Component {
  render() {
    return (
      <button onClick={() => {this.props.subscribe()}} className='button is-small is-rounded btn-subscribe-section btn-sublasa btn-sublasa-primary'>Subscribe</button>
    )
  }
}

export default SubscribeButton;