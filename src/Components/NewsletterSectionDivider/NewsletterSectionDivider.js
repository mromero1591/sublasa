import React from 'react';
import {connect} from 'react-redux';

import SubscribeButton from '../SubscribeButton/SubscribeButton';
import Axios from 'axios';

import {updateSubscribed} from '../../ducks/newsletterRecudcer/newsletterReduce';

function isSubscribed(newsletter, subscribedNewsLetters) {
    //Purpose: Check is the current newsletter is subscirbed.
    //Parmas: Object, the newsletter to check.
    //        Array, an arrya of newsletters.
    //Return: bool, is the newsletter objcect present in the array.
    //Outcome: if newsletter exist then true otherwiser false is returned.

    //use the name of the newsletter to see if the subscribed newsletter contains it
    var isSubscribed = subscribedNewsLetters.filter( (subscribedNewsLetter) => {
        return subscribedNewsLetter.id === newsletter.id;
    })

    //if there is a newsletter in the array then return true.
    if(isSubscribed.length > 0) {
        return true;
    }

    //if no newsletter is found
    return false;
}

function NewsletterSection(props) {

    function subscibeToNewsletter() {
        Axios.post(`/api/subscribe/${props.newsletter.id}`)
        .then(res => {  
            Axios.get('/api/subscribed/newsletters')
            .then( res => {
            props.updateSubscribed(res.data);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })
    }

    var subscribed = props.loggedIn ? isSubscribed(props.newsletter, props.subscribedNewsLetters) : true;
    return(
        <div className='newsletter-section-divider'>
            <h1 className='newsletter-divider-title'>{props.newsletter.name} {!subscribed && <SubscribeButton subscribe={subscibeToNewsletter} />}</h1>
            
            <div className="sectionDividerLine"></div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        subscribedNewsLetters: state.newsletter.subscribedNewsLetters,
        loggedIn: state.Auth.loggedIn
    }
}

const mapDispatchToProps = {updateSubscribed};

export default connect(mapStateToProps,mapDispatchToProps)(NewsletterSection);