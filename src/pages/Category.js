import React from 'react';
import { useParams } from 'react-router-dom';
import categoryData from '../data/category.json'
import NotFound from './NotFound';

const Category = () => {

    const { id } = useParams();
    const category = categoryData.find(category => category.route === id)
    console.log(categoryData, id, category);

    return (
        <div>
            {
                category === undefined ?
                    <NotFound /> :
                    <h1>{id}</h1>
            }

        </div>
    );
};

export default Category;