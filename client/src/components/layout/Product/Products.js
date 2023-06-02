import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import Loader from '../Loader.js';
import { getProduct, clearErrors } from '../../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { Slider, Typography } from '@mui/material';
import Header from '../Header/Header.js'
import { useAlert } from 'react-alert';
import MetaData from '../metaData';
import categories from '../../Common Utilities/categoriesName';
//
 
const Products = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const queryParams = new URLSearchParams(window.location.search)
    const cate = queryParams.get("category")

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const [hcat, setHCat] = useState(cate);

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    let count = filteredProductsCount;

    useEffect(() => {

        if(error){
            alert.show(error);
            dispatch(clearErrors());
        } 
        if(hcat != null && category !== hcat){
            setCategory(hcat);
        } 

        dispatch(getProduct(keyword, currentPage, price, category, ratings));
        if(hcat != null && category !== hcat){
            setHCat(null)
        } 
        
    }, [dispatch, hcat, keyword, currentPage, price, category, ratings, error, alert, cate])
    // console.log(count);
    return ( 
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>
                        <MetaData title='Products(RentPe)' />
                        <Header />
                        <div className='productsSection'>
                            <h2 className='productsHeading' >Products</h2>
                            <div className='products'>
                                {products &&
                                    products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                            </div>
                            
                            <div className='filterBox'>
                                <Typography>Price</Typography>
                                <Slider
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={25000}
                                    size='small'
                                />
                                <Typography>Category</Typography>
                                <ul className='categoryBox'>
                                    {categories.map((category)=>(
                                        <li
                                          className='category-link'
                                          key={category}
                                          onClick={()=> setCategory(category)}
                                         >
                                            {category}
                                         </li> 
                                    ))}
                                </ul>

                                <fieldset>
                                    <Typography className='fieldsetHeading' component="legend">Ratings Above</Typography>
                                    <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating)
                                    }}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="continuous-slider"
                                    min={0}
                                    max={5}
                                    size='small'
                                    itemclass='ratingSlider'
                                />
                                </fieldset>
                            </div>

                            {count > resultPerPage && (
                                <div className='paginationBox'>
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText=">"
                                    prevPageText="<"
                                    firstPageText="1st"
                                    lastPageText="last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                            )}
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default Products;