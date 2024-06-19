// VeggieVibes\src\components\Cuisine.jsx

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getLocalStorageData, setLocalStorageData } from '../../service/localStorage';
import Loader from '../loader/Loader';
import { Helmet } from 'react-helmet';
import { getCuisineRecipes } from '../../service/ApiClient'; // Importa la nuova funzione

const Cuisine = () => {
    const [cuisine, setCuisine] = useState([]);
    const [loading, setLoading] = useState(true);
    const { type } = useParams();

    const fetchCuisine = async (type) => {
        const localData = getLocalStorageData('cuisine_' + type);
        if (localData) {
            setCuisine(localData);
            setLoading(false);
        } else {
            try {
                const data = await getCuisineRecipes(type); // Utilizza la nuova funzione
                setCuisine(data);
                setLocalStorageData('cuisine_' + type, data, 60);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data:", error.message);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchCuisine(type);
    }, [type]);

    if (loading) {
        return <Loader />;
    }

    return (
        <Wrapper>
            <Helmet>
                <title>{type} Cuisine</title>
            </Helmet>
            <h3>{type}</h3>
            <Grid>
                {cuisine && cuisine.map((item) => (
                    <Card key={item.id}>
                        <Link to={`/detail/${item.id}`}>
                            <img src={item.image} alt={item.title} />
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                ))}
            </Grid>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    text-align: center;
    h3 {
        font-size: 1.8rem;
        font-weight: bold;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
`;

const Card = styled.div`
    background-color: #dafdda;
    border-radius: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
    }

    img {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #ddd;
    }

    h4 {
        text-align: center;
        padding: 1rem;
        font-size: 1.2rem;
        color: #333;
    }
`;

export default Cuisine;








