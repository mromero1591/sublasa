import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <div className='nav-bar-logo'>Sub<span>lasa</span></div>
          <p>
            <a href="https://marksthought.com">Created by @mromero</a>.
          </p>
        </div>
      </footer>
    )
  }
}
