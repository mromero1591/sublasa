import React, {Component} from 'react'

class NewsLetterCard extends Component {

  render(){
    return (
      <div className='box newletter-card'>
          <div className="title">{this.props.newsletter.name}</div>
          <div className='buttons newsletter-card-button'>
              <a className="button btn-sublasa btn-sublasa-primary" href="#/">Read Now</a>
          </div>
      </div>
    )
  }
}

export default NewsLetterCard;
