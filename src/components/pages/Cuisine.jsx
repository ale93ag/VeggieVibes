import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getLocalStorageData, setLocalStorageData } from '../../service/localStorage';

const Cuisine = () => {
    const [cuisine, setCuisine] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        fetchCuisine(type);
    }, [type]);

    const fetchCuisine = async (type) => {
        const localData = getLocalStorageData('cuisine_' + type);
        if (localData) {
            setCuisine(localData);
        } else {
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/complexSearch?cuisine=${type}&number=1000&diet=vegetarian&apiKey=81a32e57dbdb47bbb6ca27e9492f0d84`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCuisine(data.results);
                setLocalStorageData('cuisine_' + type, data.results, 60); // Salv0 i dati nel localStorage
            } catch (error) {
                console.error("Failed to fetch data:", error.message);
                // Gestione dell'errore: mostrare un messaggio all'utente, ecc.
            }
        }
    };

    return (
        <Wrapper>
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
    &:hover {
        text-decoration: underline
    }
    }
`;

export default Cuisine;






