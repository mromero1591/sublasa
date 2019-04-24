import React, {Component} from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';

//CUSTOM IMPORTS
import NewsletterArticleContainer from '../NewsletterArticleContainer/NewsletterArticleContainer';
import NewsletterSectionDivider from '../NewsletterSectionDivider/NewsletterSectionDivider';
import {updateNewsLetters} from '../../ducks/newsletterRecudcer/newsletterReduce';

class TopicsPage extends Component {

    componentDidMount() {
        //Purpose: When the component mounts check the URL and get the topics by id
        //Params: None
        //return: none
        //Outcome: State is updated with new newsletters.
        var topicId = this.props.match.params.id;
        this.getNewslettersByTopic(topicId);
    }

    componentDidUpdate(prevProps) {
        //Purpose: When switching topics check the new topic id and if its changed get the new topics
        //Params: None
        //return: none
        //Outcome: State is updated with new newsletters.
        var topicId = this.props.match.params.id;
        if (topicId !== prevProps.match.params.id) {
            this.getNewslettersByTopic(topicId);
        }
    }

    getNewslettersByTopic = (topicId) => {
        //Purpose: Makes an Axios call to get topics by id.
        //Params: string, the topic
        //Return: none.
        //Outcome: State is updated with new newsletters
        if(topicId !== 'all') {
            Axios.get(`/api/newletters/${topicId}`)
            .then(res => {
                this.props.updateNewsLetters(res.data);
            }).catch( err => {
                console.log('error in getting by topic', err);
            });
        } else {
            Axios.get('/api/newsletters').then(res => {
                this.props.updateNewsLetters(res.data);
            }).catch( err => {
                console.log('error in getting by topic', err);
            });
        }
    }

    render() {
        var topic = this.props.match.params.id;
        var displayNewsLetters = this.props.newsletters.map( (newsletter) => {
            return (
                <div key={newsletter.id} className="section">
                    <NewsletterSectionDivider name={newsletter.name}/>
                    <NewsletterArticleContainer newsletter={newsletter}/>
                </div>
            );
        });
        return (
            <section className='container'>
                <div className="section">
                    <h1 className='title is-uppercase'>{topic}</h1>
                </div>
                {displayNewsLetters}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        newsletters: state.newsletter.newsletters
    }
}

const mapDispatchToProps = {updateNewsLetters};

export default connect(mapStateToProps, mapDispatchToProps) (TopicsPage);