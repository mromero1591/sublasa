import React from 'react'
import {Link} from 'react-router-dom';

function ArticleCard(props) {
//Purpose: creats an Article Card Component.
//Params: props, an object containing the cards props.
//returns: ArticleCard, react component.
//outcome: React component called ArticleCard is created.

    var backGroundCard = () => {
        //Purpose: set the background style for cards
        //Params: none
        //returns: obj, contains the backgrund style
        //outcome: style is created.
        return {
            backgroundColor: props.backgroundColor
        }
    }

    return (
        <div className='box newsletter-article-card' style={backGroundCard()} >
            <div className="logo-section">
                <img className='article-card-logo' src={props.newsletter.img} alt="logo"/>
                <h1 className='title is-4'>{props.newsletterName}</h1>
            </div>
            <p>{props.article.title}</p>
            <Link to={`/articles/${props.article.id}`} className='button btn-sublasa btn-sublasa-primary btn-article-read' >
                Read
            </Link>
        </div>
    )
}

export default ArticleCard;
