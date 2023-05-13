import React, { Fragment } from 'react'
import './categoryCard.css'
import { useNavigate } from 'react-router-dom';


function CategoryCard({ image, name }) {
  const navigate = useNavigate();

  const clickHandler = () =>{
    navigate(`/products?category=${name}`);
  }


  return (
    <Fragment>
        <div onClick={clickHandler} className='categoryCardContainer'>
            <img src={image} alt='cat1' />
            <h2 className='name'>{name}</h2>
        </div>
    </Fragment>
  )
}

export default CategoryCard