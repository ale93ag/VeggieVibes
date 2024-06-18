//VeggieVibes\src\service\url.js

const SERVER_URL = 'https://api.spoonacular.com';
const recipesUrlComplexSearch = '/recipes/complexSearch';

const generateUrl = (url) => {
    return `${SERVER_URL}${url}?apiKey=${process.env.REACT_APP_API_KEY}`;
}

export { SERVER_URL, recipesUrlComplexSearch, generateUrl };
