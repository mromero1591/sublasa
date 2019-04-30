import React from "react";
import {Switch, Route} from 'react-router-dom';

//CUSTOM IMPORT
import LandingPage from './Components/LandingPageComponents/LandingPage/LandingPage';
import TopicsPage from './Components/TopicsPage/TopicsPage';
import ArticleContainer from './Components/ArticleComponents/ArticleContainer/ArticleContainer';
import SubscribedNewsLetters from './Components/SubscribedNewsLetters/SubscribedNewsLetters';
import SignUpModal from "./Components/SignUpModal/SignUpModal";
import NewsLetterPage from './Components/NewsLetterPage/NewsLetterPage';

export default (
    <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/auth' component={SignUpModal} />
        <Route path='/topics/:id' component={TopicsPage} />
        <Route path='/articles/:id' component={ArticleContainer} />
        <Route exact path='/newsletters' component={SubscribedNewsLetters} />
        <Route path='/newsletters/:id' component={NewsLetterPage} />
    </Switch>
)

