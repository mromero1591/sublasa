import React from "react";
import {Switch, Route} from 'react-router-dom';

//CUSTOM IMPORT
import LandingPage from './Components/LandingPageComponents/LandingPage/LandingPage';
import TopicsPage from './Components/TopicsPage/TopicsPage';
import ArticleContainer from './Components/ArticleComponents/ArticleContainer/ArticleContainer';

export default (
    <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/topics/:id' component={TopicsPage} />
        <Route path='/articles/:id' component={ArticleContainer} />
    </Switch>
)

