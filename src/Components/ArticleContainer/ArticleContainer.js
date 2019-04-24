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

        document.body.scrollTop = document.documentElement.scrollTop = 0;
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
            <iframe title={this.state.currentArticle.title} srcDoc={this.state.currentArticle.content}  className='article-container' frameBorder="0"></iframe>
        )
    }
}

export default ArticleContainer;