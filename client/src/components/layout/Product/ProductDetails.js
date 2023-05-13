import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, clearErrors, newReview } from '../../../actions/productAction';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import ReactStars from 'react-rating-stars-component';
import './ProductDetail.css'
import ReviewCard from './ReviewCard.js'
import Loader from '../Loader';
import { useAlert } from 'react-alert';
import MetaData from '../metaData';
import { addItemToCart } from '../../../actions/cartAction.js';
import Header from '../Header/Header';
import { Rating } from '@material-ui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../../constants/productConstants';


const ProductDetails = () =>{
    
    const alert = useAlert();
    const dispatch = useDispatch();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    const { success, error: reviewError} = useSelector((state)=>state.newReview);

    const { isAuthenticated } = useSelector(
        (state) => state.user
      );
    

    const { id } = useParams();

    useEffect(()=>{
        if (error){
            alert.show(error);
            dispatch(clearErrors())
        }
        if (reviewError){
            alert.show(reviewError);
            dispatch(clearErrors())
        }
        if (success){
            alert.show("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET});
        }
        dispatch(getProductDetails(id));
        localStorage.setItem("category", product.category);

    }, [dispatch, id, error, alert, reviewError, success, product.category]);


    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () =>{
        if (product.stock === quantity){
            alert.show(`Only ${product.stock} prducts left`);
            return;
        }
        let qty = quantity + 1;
        setQuantity(qty); 
    }

    const decreaseQuantity = () =>{
        let qt = quantity - 1;
        setQuantity(qt);
    }
    
    

    const addToCartHandler = () =>{
        
        dispatch(addItemToCart(id, quantity, product.minDuration, product.city))
        alert.show("Item Added Succesfully");
    }

    const submitReviewToggle = () =>{
        if(isAuthenticated === true){
            open ? setOpen(false) : setOpen(true);
        } else {
            alert.show("Please Login first")
        }

        // open ? setOpen(false) : setOpen(true);

    }

    const reviewSubmitHandler = () =>{
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
 
        dispatch(newReview(myForm));
        setOpen(false);
    }

    return(
        <Fragment>
            {loading ? (<Loader />) :
            <Fragment>
            <MetaData title={`${product.name}(RentPe)`} />
            <Header />

            <div className='ProductDetails'>
              <div >
                  <Carousel className='crosul'>
                      {product.images && 
                        product.images.map((item, i)=>(
                          <img className='CarouselImages'
                            key={item.url}
                            src={item.url}
                            alt={`${i} Slide`} />
                        ))
                      }
                  </Carousel>
              </div>
              <div>
                  <div className='detailsBlock-1'>
                      <h2>{product.name}</h2>
                      <p>Product #{product._id}</p>
                  </div>
                  <div className='detailsBlock-2'>
                  <Rating {...options} />
                      <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
                  </div>
                  <div className='detailsBlock-3'>
                      <h1>{'\u20B9'} {product.price}/day</h1>
                      <div className='detailsBlock-3-1'>
                          <div className='detailsBlock-3-1-1'>
                              <button onClick={decreaseQuantity}>-</button>
                              <input readOnly value={quantity > 0 ? quantity : 1} type="number" />
                              <button onClick={increaseQuantity}>+</button>
                          </div>{" "}
                          <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                      </div>
                      <p>
                          Status:{" "}
                          <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                              {product.stock < 1 ? "OutOfStock" : "InStock"}
                          </b>
                      </p>
                  </div>
                  <div className='detailsBlock-4'>
                      Description : <p>{product.description}</p>
                  </div>
                  <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
              </div>
            </div>
            <h3 className='reviewsHeading'>REVIEWS</h3>

            <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

            {
              product.reviews && product.reviews[0] ? (
                  <div className='reviews'>
                      {product.reviews.map((review) => <ReviewCard id={review.user} review={review} />)}
                  </div>
              ) : (
                  <p className='noReviews' >No Reviews yet</p>
              )
            }
          </Fragment>
            }
        </Fragment>
    )
}

export default ProductDetails;