import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../layout/metaData";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

const OrderDetails = ({ match }) => {
    const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { cartItems } = useSelector((state)=>state.cart);

  const dispatch = useDispatch();
  const alert = useAlert();

  function getDuration(targetId) {
    // Find the object with the matching ID
    const targetObject = cartItems.find(obj => obj.product === targetId);
    
    // If no object was found, return null or some other default value
    if (!targetObject) {
      return null;
    }
    
    // Otherwise, return the duration of the target object
    return targetObject.duration;
  }
  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Item:</Typography>
              {
                order.item && 
                <div className="orderDetailsCartItemsContainer">
                    <div>
                      <img src={order.item.image} alt="Product" />
                      <Link to={`/product/${order.item.product}`}>
                        {order.item.name}
                      </Link>{" "}
                      <span>
                      {getDuration(order.item.product)} X {order.item.quantity} X ₹{order.item.price} ={" "}
                        <b>₹{getDuration(order.item.product) * order.item.price * order.item.quantity}</b>
                      </span>
                    </div>
              </div>
              }
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;