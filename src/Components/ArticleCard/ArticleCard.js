import React, { Component } from 'react'
import {Link} from 'react-router-dom';

class ArticleCard extends Component {
    backGroundCard = () => {
        return {
            backgroundColor: this.props.backgroundColor
        }
    }

    render() {
        return (
            <div className='box newsletter-article-card' style={this.backGroundCard()}>
                <p>{this.props.article.title}</p>
                <Link to={`/articles/${this.props.article.id}`} className='button btn-sublasa btn-sublasa-primary' >
                    Read
                </Link>
            </div>
        )
    }
}

export default ArticleCard;
