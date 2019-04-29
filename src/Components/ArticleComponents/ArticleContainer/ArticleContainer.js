import React, {Component} from 'react';
import Axios from 'axios';

import ArticleNavigation from '../ArticleNavigation/ArticleNavigation';

class ArticleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentArticle: {
            },
            isTop: true
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    componentDidMount() { 
        window.addEventListener('scroll', this.handleScroll);
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
            var div = document.getElementById('article');
            div.innerHTML = this.state.currentArticle.content;
        }).catch(err => {
            console.log('error in getting the article', err);
        })
    }

    handleScroll = (event) => {
        if(document.documentElement.scrollTop !== 0) {
            this.setState({isTop: false});
        } else {
            if(this.state.scrollTop !== true) {
                this.setState({isTop: true});
            }
        }
    }

    render() {
        return(
            <section className='container '>
                <ArticleNavigation isTop={this.state.isTop} goBack={this.props.history.goBack}  title={this.state.currentArticle.title} />
                <div className="continer article-container">
                    <div id='article'></div>
                </div>
            </section>
        )
    }
}

export default ArticleContainer;