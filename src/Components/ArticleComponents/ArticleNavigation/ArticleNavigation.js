import React, {Component} from 'react';

function scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function ArticleNavigation(props) {
    return (
        <aside className="menu article-navigation-wrapper">
            <div className='article-navigation'>
                <ul className="menu-list">
                    <li onClick={props.goBack}><p className='article-navigation-button'>Go Back</p></li>
                    <li onClick={scrollToTop}><p className='article-navigation-button'>To Top</p></li>
                </ul>
            </div>
        </aside>
    )
}

export default ArticleNavigation;