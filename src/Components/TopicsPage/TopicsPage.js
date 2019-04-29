import React from 'react';

import {connect} from 'react-redux';

//CUSTOM IMPORTS
import NewsletterArticleContainer from '../NewsletterArticleContainer/NewsletterArticleContainer';
import NewsletterSectionDivider from '../NewsletterSectionDivider/NewsletterSectionDivider';
import {updateNewsLetters} from '../../ducks/newsletterRecudcer/newsletterReduce';


function setScrollTop() {
    //Purpose: Set page to be at top 
    //Params: None
    //return: none
    //Outcome: Page is at top
    document.body.scrollTop = document.documentElement.scrollTop = 0;
}

function TopicsPage(props){

    setScrollTop();

    function getTopicId(topicName) {
        var newTopic = props.topics.filter(topic => {
            if(topic.name === topicName) {
                return topic.id;
            }
        })
        if(newTopic.length > 0) {
            return newTopic[0].id;
        }
            return -1;
    }

    function getNewsLetterDisplay() {
        var display = props.newsletters.map( (newsletter) => {
        
            if(topic !== 'all') {
                var topicId = getTopicId(topic);
                if(topicId === newsletter.topic_id) {
                    return (
                        <div key={newsletter.id} className="section">
                            <NewsletterSectionDivider newsletter={newsletter}/>
                            <NewsletterArticleContainer newsletter={newsletter}/>
                        </div>
                    );    
                }
            } else {
                return (
                    <div key={newsletter.id} className="section">
                        <NewsletterSectionDivider newsletter={newsletter}/>
                        <NewsletterArticleContainer newsletter={newsletter}/>
                    </div>
                );
            }
        })
        return display;
    }

    var topic = props.match.params.id;
    var displayNewsLetters = getNewsLetterDisplay();

    return (
        <section className='container'>
            <div className="section">
                <h1 className='title is-uppercase'>{topic}</h1>
            </div>
            {displayNewsLetters}
        </section>
    )
}

function mapStateToProps(state) {
    return {
        newsletters: state.newsletter.newsletters,
        topics: state.newsletter.topics
    }
}

const mapDispatchToProps = {updateNewsLetters};

export default connect(mapStateToProps, mapDispatchToProps) (TopicsPage);