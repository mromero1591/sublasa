import React, {Component} from 'react';

class ArticleNavigation extends Component {
    scrollToTop = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
   
    render() {
        return (
            <aside className="menu article-navigation-wrapper">
                <div className='article-navigation'>
                    <ul className="menu-list">
                        <li onClick={this.props.goBack}><p className='article-navigation-button'>Go Back</p></li>
                        <li onClick={this.scrollToTop}><p className='article-navigation-button'>To Top</p></li>
                    </ul>
                </div>
            </aside>
        )
    }
}

export default ArticleNavigation;