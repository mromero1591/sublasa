import React, {Component} from 'react';

class ArticleNavigation extends Component {

    scrollToTop = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    render() {
        return (
            <aside class="menu article-navigation-wrapper">
                <div className='article-navigation'>
                    <ul class="menu-list">
                        <li onClick={this.props.goBack}><a className=''>Go Back</a></li>
                        <li onClick={this.scrollToTop}><a>To Top</a></li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default ArticleNavigation;