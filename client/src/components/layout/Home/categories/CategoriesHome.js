import React, { Fragment } from 'react'
import CategoryCard from './CategoryCard.js';

import './categoryCard.css';
// import img1 from '../../../images/categories/construction.jpg'
import categories from '../../../Common Utilities/categoriesName.js';

import img1 from '../../../images/categories/electronics.jpg';
import img2 from '../../../images/categories/Genetrator.jpg';
import img3 from  '../../../images/categories/cloth.png';
import img4 from '../../../images/categories/books_logo.jpg';

import img5 from '../../../images/categories/sports.jpg';
import img6 from  '../../../images/categories/furniture.jpg';
import img7 from '../../../images/categories/party.jpg';
import img8 from  '../../../images/categories/electronics.jpg';
import img9 from '../../../images/categories/Transport.jpg';
import img10 from '../../../images/categories/construction.jpg';
import img11 from'../../../images/categories/Machinery.jpg';

import allCate from'../../../images/categories/allCat.jpg';
import { Link } from 'react-router-dom';


const images = [ img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11
]
const arr = [1, 2, 3, 4]



export function CategoriesHome() {
    return (
        <Fragment>
            <div className='heading'>
            <h1>Categories</h1>
            </div>
            <div className='category'> 
            {
                arr.map((num, index)=>(
                    <CategoryCard image={images[num-1]} name={categories[index]} key={index} />
                ))
               }
               <Link to={'/categories'}>
               <CategoryCard image={allCate} name= 'Visit All' />
               </Link>
            </div>
        </Fragment>
    )
}

export function Categories() {
    return (
        <Fragment>
            <div className='heading'>
            <h1>Categories</h1>
            </div>
            <div className='category'>
                {
                    categories.map((category, index)=>(
                        <CategoryCard image={images[index]} name={category} key={index} />
                    ))
                }
            </div>
        </Fragment>
    )
}
