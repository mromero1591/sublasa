import React, {Component} from 'react';
import Axios from 'axios';

class ArticleContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentArticle: {
                content: ''
            }
        }
    }

    componentDidMount() { 
        var id = this.props.match.params.id;
        Axios.get(`/api/articles/${id}`)
        .then(res => {
            this.setState({
                currentArticle: res.data
            })
        }).catch(err => {
            console.log('error in getting the article', err);
        })
        

    }
    render() {
        return(
            <iframe srcDoc={this.state.currentArticle.content}  className='article-container' frameBorder="0"></iframe>
        )
    }
}

function mapStateToProps(state) {
    return {
        articles: state.articles.articles,
        currentArticle: state.articles.currentArticle
    }
}

export default ArticleContainer;