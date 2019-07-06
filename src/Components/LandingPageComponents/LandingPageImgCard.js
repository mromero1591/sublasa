import React from 'react';

function LandingPageImgCard({image, title,text}) {
    return(
        <div className='box landing-card'>
          <img className='landing-cards-img' src={image} alt={title}/>
          <div className="landing-card-content">
            <h4 className='title is-size-4'>{title}</h4>
            <p>{text}</p>
          </div>
        </div>
    )
}

export default LandingPageImgCard;