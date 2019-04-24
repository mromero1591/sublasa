import {createStore,combineReducers} from 'redux';

import newsLetterReducer from './newsletterRecudcer/newsletterReduce';
import articlesReducer from './articlesReducer/articlesReducer';

const reducer = combineReducers({
    newsletter: newsLetterReducer, 
    articles: articlesReducer
});

export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
