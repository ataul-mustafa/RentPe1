import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstant";

//Add to Cart action
export const addItemToCart = (id, quantity, duration, city) => async(dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
        
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.products._id,
                name: data.products.name,
                price: data.products.price,
                image: data.products.images[0].url,
                stock: data.products.stock,
                quantity,
                minDuration: data.products.minDuration,
                duration,
                city,
            },
        })

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

//Remove from cart
export const removeItemsFromCart = (id) => async(dispatch, getState) => {
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// Save shipping info
export const saveShippingInfo = (data) => async (dispatch) =>{
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
}