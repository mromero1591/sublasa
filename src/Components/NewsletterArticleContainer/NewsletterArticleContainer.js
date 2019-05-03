import React, { Component } from 'react'
import Axios from 'axios';
import {connect} from 'react-redux';

//Custom imports
import ArticleCard from '../ArticleComponents/ArticleCard/ArticleCard';
import {updateArticles} from '../../ducks/articlesReducer/articlesReducer';

class NewsletterArticleContainer extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    var newsletterId = this.props.newsletter.id;

    Axios.get(`/api/newsletter/${newsletterId}/articles`)
    .then(res => {
      if(this._isMounted){
        this.props.updateArticles(res.data);
      }
    }).catch( err => {
      console.log('err in fecting articles of a newsletter:', err);
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    var displayNewsletterArticles = this.props.articles.map( (article, index) => {
      if(article.newsletter_id === this.props.newsletter.id) {
        var backgroundColor = '#3e4c4f';

        if(index % 2 !== 0) {
          backgroundColor = '#70788e';
        }
        return(
          <ArticleCard key={article.id} newsletterId={this.props.newsletter.id} newsletterName={this.props.newsletter.name} article={article} backgroundColor={backgroundColor}/>
        )
      }
      return '';
    })
    return (
      <section className='newsletter-article-container'>
          {displayNewsletterArticles}
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles.articles
  }
}

const mapDispatchToProps = {updateArticles}

export default connect(mapStateToProps,mapDispatchToProps)(NewsletterArticleContainer);