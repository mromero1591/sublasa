import React from 'react'

export default function NewsLetterCard(props) {
  console.log(props.newsletter);
  return (
    <div className='box newletter-card'>
        <div className="title">{props.newsletter.name}</div>
        <div className='buttons newsletter-card-button'>
            <a className="button btn-sublasa btn-sublasa-primary" href="#/">Read Now</a>
        </div>
    </div>
  )
}
