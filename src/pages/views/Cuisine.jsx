import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../loader/Loader';
import { Helmet } from 'react-helmet';
import { getCuisineRecipes } from '../../service/ApiClient';
import useStore from '../../store/useStore';

const Cuisine = () => {
    const [loading, setLoading] = useState(true);
    const { type } = useParams();
    const { cuisine, setCuisine } = useStore(); // Utilizzo di Zustand per gestire le ricette di tipo cuisine

    const fetchCuisine = useCallback(async (type) => {
        try {
            setLoading(true);
            const data = await getCuisineRecipes(type); // Chiamata API per ottenere le ricette per il tipo specificato
            setCuisine(data); // Imposta le ricette di tipo cuisine nello stato di Zustand
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch data:", error.message);
            setLoading(false);
        }
    }, [setCuisine]);

    useEffect(() => {
        fetchCuisine(type);
    }, [type, fetchCuisine]);

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










