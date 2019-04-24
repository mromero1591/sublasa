//set inital state
var initalState = {
    articles: [],
    currentArticle: {}
}

const UPDATE_ARTICLES = 'UPDATE_ARTICLES';
const UPDATE_CURRENT_ARTICLE = 'UPDATE_CURRENT_ARTICLE';

function reducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_ARTICLES:
            //get the current articles
            var currentArticles = [...state.articles];

            //an array to hold the new articles that we will add to state.
            var newArticles = [];

            //loop through the new articles coming from the paylod
            action.payLoad.forEach( newArticle => {
                //if the article already exist then do not add it to the new articles array
                let alreadyExist = currentArticles.find( oldArticle => {
                    return oldArticle.id === newArticle.id;
                })
                if(alreadyExist === undefined) {
                    newArticles = [...newArticles, newArticle];
                }
            });
            //return the new state.
            return {
                ...state,
                articles: [...state.articles,...newArticles]
            }
        case UPDATE_CURRENT_ARTICLE:
            return {
                ...state,
                currentArticle: action.payLoad
            }
        default:
            return state;
    }
}

export function updateArticles(articles) {
    return {
        type: UPDATE_ARTICLES,
        payLoad: articles
    }
}

export function updateCurrentArticle(article) {
    return {
        type: UPDATE_CURRENT_ARTICLE,
        payLoad: article
    }
}

export default reducer;