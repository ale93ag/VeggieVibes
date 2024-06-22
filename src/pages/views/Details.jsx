import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../loader/Loader';
import { Helmet } from 'react-helmet';
import { getRecipeDetails } from '../../service/ApiClient';

const Details = () => {
    const { id } = useParams();
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRecipeDetails = useCallback(async () => {
        try {
            const data = await getRecipeDetails(id);
            setRecipeDetails(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchRecipeDetails();
    }, [fetchRecipeDetails]);

    if (loading) {
        return <Loader />;
    }

    if (!recipeDetails) {
        return <div>Dati non disponibili.</div>;
    }

    const calories = recipeDetails.nutrition?.nutrients?.find(nutrient => nutrient.name === 'Calories')?.amount;
    const nutrients = recipeDetails.nutrition?.nutrients?.filter(nutrient => nutrient.name !== 'Calories');

    return (
        <div>
            <Helmet>
                <title>{recipeDetails.title}</title>
            </Helmet>
            <h1>{recipeDetails.title}</h1>
            <img src={recipeDetails.image} alt={recipeDetails.title} />
            <h2>Ingredients</h2>
            <ul>
                {recipeDetails.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                ))}
            </ul>
            <h2>Instructions</h2>
            <div dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} />
            {calories && (
                <div>
                    <h2>Nutrition</h2>
                    <TableContainer>
                        <Table>
                            <thead>
                                <tr>
                                    <TableHeader>Nutrient</TableHeader>
                                    <TableHeader>Amount</TableHeader>
                                    <TableHeader>Unit</TableHeader>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <TableCell>Calories</TableCell>
                                    <TableCell>{calories}</TableCell>
                                    <TableCell>kcal</TableCell>
                                </tr>
                                {nutrients.map((nutrient) => (
                                    <tr key={nutrient.name}>
                                        <TableCell>{nutrient.name}</TableCell>
                                        <TableCell>{nutrient.amount}</TableCell>
                                        <TableCell>{nutrient.unit}</TableCell>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
};

const TableContainer = styled.div`
    margin-top: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    background-color: #f2f2f2;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    text-align: left;
`;

const TableCell = styled.td`
    border-bottom: 1px solid #ddd;
    padding: 10px;
    text-align: left;
`;

export default Details;


