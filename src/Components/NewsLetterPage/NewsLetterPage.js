import React, { Component } from 'react'
import Axios from 'axios';

import ArticleCard from '../ArticleComponents/ArticleCard/ArticleCard';

export default class NewsLetterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: []
        }
    }
    componentDidMount() {
        console.log(this.props);
        Axios.get(`/api/newsletter/${this.props.match.params.id}`)
        .then( res => {
            this.setState({articles: res.data});
        })
    }

    render() {
        var displayArticles = this.state.articles.map( article => {
            return (
                <ArticleCard article={article}  key={article.id}/>
            )
        });

        return (
            <section className='container'>
                <div className="section">
                    <h1 className='title is-uppercase'>{this.state.articles[0] ? this.state.articles[0].name : '' }</h1>
                </div>
                <div className="article-card-container">
                    {displayArticles}
                </div>
            </section>
        )
  }
}
