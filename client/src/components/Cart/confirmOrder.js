import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../layout/metaData";
import './confirmOrder.css'
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../layout/Header/Header";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);


    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.duration * (item.quantity * item.price),
        0
    )

    const shippingCharge = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    let totalPrice = subtotal + tax + shippingCharge;
    totalPrice = Math.round(totalPrice);

    let priceArray = [];
    for (let i = 0; i < cartItems.length; i++) {
        const subtotal = cartItems[i].duration * (cartItems[i].quantity * cartItems[i].price);
        const tax = subtotal * 0.18;
        const shippingCharges = shippingCharge;
        const totlPrice = subtotal + tax + shippingCharges;
        priceArray.push({
            subtotal,
            tax,
            shippingCharges,
            totalPrice: totlPrice,
        })
    }

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges: shippingCharge,
            tax,
            totalPrice,
            priceArray,

        };
        sessionStorage.setItem("OrderInfo", JSON.stringify(data));
        navigate('/process/payment');
    }
    return (
        <Fragment>
            <MetaData title='Confirm-Order' />
            <Header />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info:</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items: </Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="product" />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>{" "}
                                        <span>
                                            {item.quantity} X {item.price} X {item.duration} = {" "}
                                            <b>{item.price * item.quantity * item.duration}</b>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {" "}

                <div>
                    <div className="orderSummary">
                        <Typography>Order Summary</Typography>
                        <div>
                            <div>
                                <p>Subtotal: </p>
                                <span>{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges: </p>
                                <span>{shippingCharge}</span>
                            </div>
                            <div>
                                <p>GST: </p>
                                <span>{tax}</span>
                            </div>
                        </div>
                        <div className="orderSummaryTotal">
                            <p>
                                <b>Total: </b>
                            </p>
                            <span>
                                {totalPrice}
                            </span>
                        </div>
                        <button onClick={proceedToPayment} >Proceed to Payment</button>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder;