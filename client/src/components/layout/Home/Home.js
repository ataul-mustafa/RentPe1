// import { Fragment } from "react"
import { CgMouse } from 'react-icons/cg'
import "./Home.css"
import ProductCard from './ProductCard.js'
import MetaData from '../metaData'
import Loader from '../Loader.js'
// import Header from '../Header/Header'
// import HeroSlider from '../Hero-slider/Hero-slider'
// import Imagecarousel from '../PromotProduct/Imagecarousel'
// import Slider from '../Slider/Slider'


import { clearErrors, getProduct } from "../../../actions/productAction.js"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react'
import { useAlert } from 'react-alert'
import Slider from './Slider/Slider.js';
import Features from './Features/Features'
// import Categories from './categories/CategoriesHome.js'
import { CategoriesHome } from './categories/CategoriesHome'
import { useNavigate } from 'react-router-dom'
import Footer from './footer/Footer'

// import Cate1Products from '../Product/cate1Products'


// const product = {
//     name: "Blue TShirt",
//     images: [{url: "https://i.pinimg.com/474x/81/ca/47/81ca47eaae35615ba9a9bb57560aaa3c.jpg"}],
//     price: "3000",
//     _id: "ataul",
// }

const Home = ({ user }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, products } = useSelector((state) => state.products)
    


    useEffect(() => {
        const category = localStorage.getItem("category");
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
        <div >
            <Slider />
            {loading ? <Loader /> :
            <div className="wrapper">
            <MetaData title="RentPe" />
            <div className="banner">
                <div className='bannerBox'>
                <p>Welcome to RentPe</p>
                <h1>FIND AMAZING RENT PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Explore <CgMouse />
                    </button>
                </a>
                </div>
            </div>

            <div className='features'>
                <Features />
            </div>

            <div className='categories'>
                <CategoriesHome />
            </div>

            <h2 className="homeHeading">Featured Products</h2> 
            <div className="container" id="container">
                {products && products.map(product => (
                    <ProductCard user={user} key={product._id} product={product} />
                ))}
            </div>
            {/* <div>
                <Cate1Products />
            </div> */}

            <div className='footer' >
                <Footer />
            </div>
        </div>
            }
        </div>
    )
}

export default Home;