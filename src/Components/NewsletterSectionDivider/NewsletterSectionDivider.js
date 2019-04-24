import React, {Component} from 'react';

class NewsletterSection extends Component {
    render() {
        return(
            <div className='newsletter-section-divider'>
                <h1 className='newsletter-divider-title'>{this.props.name}</h1>
                <div className="sectionDividerLine"></div>
            </div>
        );
    }
}

export default NewsletterSection;