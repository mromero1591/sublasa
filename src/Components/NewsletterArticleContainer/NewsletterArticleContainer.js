import React, { Component } from 'react'
import Axios from 'axios';

import ArticleCard from '../ArticleCard/ArticleCard';

class NewsletterArticleContainer extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      newsletterArticles: [],
      articleImgs: []
    }
  }
  componentDidMount() {
    this._isMounted = true;
    var newsletterId = this.props.newsletter.id;
    Axios.get(`/api/newsletter/${newsletterId}/articles`)
    .then(res => {
      if(this._isMounted){
        this.setState({newsletterArticles: res.data});
      }
    }).catch( err => {
      console.log('err in fecting articles of a newsletter:', err);
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    var displayNewsletterArticles = this.state.newsletterArticles.map( (article, index) => {
      var backgroundColor = '#3e4c4f';

      if(index % 2 !== 0) {
        backgroundColor = '#df8d4e';
      }
      return(
        <ArticleCard key={article.id} article={article} backgroundColor={backgroundColor}/>
      )
    })
    return (
      <section className='newsletter-article-container'>
          {displayNewsletterArticles}
      </section>
    )
  }
}

export default NewsletterArticleContainer;