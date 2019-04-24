import React, {Component} from 'react';
import Axios from 'axios';

import ArticleNavigation from '../ArticleNavigation/ArticleNavigation';

class ArticleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentArticle: {
            }
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    componentDidMount() { 
        var id = this.props.match.params.id;
        Axios.get(`/api/articles/${id}`)
        .then(res => {
            var content = res.data.content;
            var locationOfStart = content.indexOf('<body');
            var locationEndOfEnd = content.indexOf('</body>');
            var updatedContent = content.substring(locationOfStart-1, locationEndOfEnd);
            var newArtcile = {
                ...res.data,
                content: updatedContent
            }
            this.setState({
                currentArticle: newArtcile
            })
            var div = document.getElementById('test');
            div.innerHTML = this.state.currentArticle.content;
        }).catch(err => {
            console.log('error in getting the article', err);
        })
    }

    render() {
        return(
            <section className='container'>
                <ArticleNavigation goBack={this.props.history.goBack}  title={this.state.currentArticle.title} />
                <div className="continer article-container">
                    <div id='test'></div>
                </div>
                {/* <iframe title={this.state.currentArticle.title} srcDoc={this.state.currentArticle.content}  className='article-container' frameBorder="0"></iframe> */}
            </section>
        )
    }
}

export default ArticleContainer;