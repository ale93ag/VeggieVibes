import axios from 'axios';
import { SERVER_URL, recipesUrlComplexSearch } from './url';

// Dichiarazione centralizzata della APIKEY
const APIKEY = '81a32e57dbdb47bbb6ca27e9492f0d84';

const getDessertService = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}${recipesUrlComplexSearch}`, {
            params: {
                number: 1000,
                type: 'dessert',
                diet: 'vegetarian',
                apiKey: APIKEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching dessert data:', error);
        throw error;
    }
};

const getMainCourseService = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}${recipesUrlComplexSearch}`, {
            params: {
                number: 1000,
                type: 'main course',
                diet: 'vegetarian',
                apiKey: APIKEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching main course data:', error);
        throw error;
    }
};

const getSnackService = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}${recipesUrlComplexSearch}`, {
            params: {
                number: 1000,
                type: 'snack',
                diet: 'vegetarian',
                apiKey: APIKEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching snack data:', error);
        throw error;
    }
};

const getBreakfastService = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}${recipesUrlComplexSearch}`, {
            params: {
                number: 1000,
                type: 'breakfast',
                diet: 'vegetarian',
                apiKey: APIKEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching breakfast data:', error);
        throw error;
    }
};

const getSideDishService = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}${recipesUrlComplexSearch}`, {
            params: {
                number: 1000,
                type: 'side dish',
                diet: 'vegetarian',
                apiKey: APIKEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching side dish data:', error);
        throw error;
    }
};

const getAppetizerService = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}${recipesUrlComplexSearch}`, {
            params: {
                number: 1000,
                type: 'appetizer',
                diet: 'vegetarian',
                apiKey: APIKEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching appetizer data:', error);
        throw error;
    }
};

const searchRecipesService = async (query) => {
    try {
        const response = await axios.get(`${SERVER_URL}${recipesUrlComplexSearch}`, {
            params: {
                query,
                number: 1000,
                apiKey: APIKEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error;
    }
};

const getRecipeDetails = async (id) => {
    try {
        const response = await axios.get(`${SERVER_URL}/recipes/${id}/information`, {
            params: {
                includeNutrition: true,
                apiKey: APIKEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
    }
};

const getCuisineRecipes = async (type) => {
    try {
        const response = await axios.get(`${SERVER_URL}/recipes/complexSearch`, {
            params: {
                cuisine: type,
                number: 1000,
                diet: 'vegetarian',
                apiKey: APIKEY
            }
        });
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching ${type} cuisine recipes:`, error);
        throw error;
    }
};

export { 
    getDessertService, 
    getMainCourseService, 
    getSnackService, 
    getBreakfastService, 
    getSideDishService, 
    getAppetizerService, 
    searchRecipesService,
    getRecipeDetails,
    getCuisineRecipes
};





