import { combineReducers, applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools} from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer, vendorProductsReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, updateProfileReducer, userDetailsReducer, userReducer} from "./reducers/userReducer.js";
import { cartReducer } from "./reducers/cartReducer.js";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
import { adBannerReducer } from "./reducers/adBannerReducer";
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: updateProfileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    product: productReducer,
    newReview: newReviewReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    newProduct: newProductReducer,
    vendorProducts: vendorProductsReducer,
    adminProducts: vendorProductsReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    adBanner: adBannerReducer,
})

let initialState={
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")): {},
        category: localStorage.getItem('category') ? localStorage.getItem('category') : ""
    },
};

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  export default store;
