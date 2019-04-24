import React, {Component} from 'react';

class ArticleNavigation extends Component {
    render() {
        return (
            <nav className="breadcrumb is-centered article-navigation" aria-label="breadcrumbs">
                <ul>
                    <li onClick={this.props.goBack}><a href="#">Go Back</a></li>
                    <li className="is-active"><a href="#" aria-current="page">{this.props.title}</a></li>
                </ul>
            </nav>
        )
    }
}

export default ArticleNavigation;