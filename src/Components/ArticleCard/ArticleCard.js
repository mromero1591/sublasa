import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Unsplash from 'unsplash-js';
import Axios from 'axios';

export default class ArticleCard extends Component {
    componentDidMount() {
        
    }

    backGroundCard = () => {
        return {
            backgroundColor: this.props.backgroundColor
        }
    }

    render() {
        return (
            <div className='box newsletter-article-card' style={this.backGroundCard()}>
                <p>{this.props.article.title}</p>
                <Link to={`/article/${this.props.article.id}`} className='button btn-sublasa btn-sublasa-primary'>
                    Read
                </Link>
            </div>
        )
    }
}
