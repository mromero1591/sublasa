import React from 'react'
import {Link} from 'react-router-dom';

//custom
import command_line from '../../../assets/Logos/1.svg';
import the_interface from '../../../assets/Logos/2.svg';
import the_hustle from '../../../assets/Logos/3.svg';
import axios_am from '../../../assets/Logos/4.svg';
import axios_pm from '../../../assets/Logos/5.svg';
import axios_space from '../../../assets/Logos/6.svg';
import the_skimm from '../../../assets/Logos/7.svg';


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

    var getLogo = (id) => {
        var logos = [command_line,the_hustle,the_interface,axios_am,axios_pm,axios_space,the_skimm];

        return logos[id - 1];
    }

    return (
        <div className='box newsletter-article-card' style={backGroundCard()} >
            <div className="logo-section">
                <img className='article-card-logo' src={getLogo(props.newsletterId)} alt=""/>
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
