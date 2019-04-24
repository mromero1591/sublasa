import React, { Component } from 'react'
import {connect} from 'react-redux';

//CUSTOM IMPORTS
import {updateNewsLetters} from '../../../ducks/newsletterRecudcer/newsletterReduce';
import NewsLetterCard from '../../NewsLetterCard/NewsLetterCard';

class LandingBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advertisedNewsLetter: {},
        }
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.newsletters !== prevProps.newsletters) {
            const {newsletters} = this.props;
            this.setState({
                advertisedNewsLetter: {...newsletters[0]}
            })
        }
    }
      
    render() {
        var newsLetterCards = this.props.newsletters.slice(0, 5).map( (newsletter) => {
            return (
                <div className="" key={newsletter.id}>
                    <NewsLetterCard newsletter={newsletter}/>
                </div>
            )
        })
        return (
            <section className="">
                <header className="container desktop">
                    <div className="columns">
                        <div className="column has-text-centered">
                            {this.state.advertisedNewsLetter.name}
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column has-text-centered is-half is-offset-one-quarter">
                            {this.state.advertisedNewsLetter.snippet}
                        </div>
                    </div>
                </header>
            </section>
        )
  }
}


function mapStateToProps(state) {
    return {
        newsletters: state.newsletter.newsletters
    }
}

var mapDispatchToProps = {updateNewsLetters};

export default connect(mapStateToProps,mapDispatchToProps)(LandingBanner);