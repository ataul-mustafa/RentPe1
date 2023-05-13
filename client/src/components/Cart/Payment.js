import './Payment.css'
import { Typography } from '@mui/material';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'
import { Fragment, useEffect, useRef } from 'react';
import Header from '../layout/Header/Header';
import MetaData from '../layout/metaData';
import CheckoutSteps from './CheckoutSteps';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../actions/orderAction';


const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('OrderInfo'));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state)=>state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrices: orderInfo.priceArray,
    };


    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                      order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                      };

                      dispatch(createOrder(order));

                    navigate("/success");
                } else {
                    alert.error("There's some issue while processing payment ");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
        }
    };
    

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors);
        }
    },[alert, error, dispatch])

    return (
        <Fragment>
            <MetaData title={'Payment'} />
            <Header />
            <CheckoutSteps activeStep={2} />
            <div className='paymentContainer'>
                <form className='paymentForm' onSubmit={(e) => submitHandler(e)} >
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className='paymentInput' />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className='paymentInput' placeholder='Enter Expiry' />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className='paymentInput' placeholder='Enter CVV' />
                    </div>
                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    )
}

export default Payment;