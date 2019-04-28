import React, {Component} from 'react';

import SubscribeButton from '../SubscribeButton/SubscribeButton';

class NewsletterSection extends Component {
    render() {
        return(
            <div className='newsletter-section-divider'>
                <h1 className='newsletter-divider-title'>{this.props.name} <SubscribeButton /></h1>
                
                <div className="sectionDividerLine"></div>
            </div>
        );
    }
}

export default NewsletterSection;