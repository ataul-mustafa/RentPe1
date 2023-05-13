import React, { Fragment } from 'react'
import { useEffect } from 'react';
import '../Home/Home.css';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProduct, clearErrors } from '../../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import { useSelector } from 'react-redux';


function Cate1Products() {

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, products } = useSelector((state) => state.products)
    
    useEffect(() => {
        const category = 'Electronic Gadget';
        if (category) {
            const keyword = "";
            const currentPage = 1;
            const price = [0, 25000];
            dispatch(getProduct(keyword, currentPage, price, category));

        } else {
            dispatch(getProduct());
        }
        if(error){
            alert.show(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert, navigate])

  return (
    <Fragment>
        <h2 className="homeHeading">Featured Products</h2> 
            <div className="container" id="container">
                {products && products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
    </Fragment>
  )
}

export default Cate1Products