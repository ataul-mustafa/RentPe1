import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getVendorProduct } from "../../actions/productAction.js";
import { vendorOrders } from "../../actions/orderAction.js";
// import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/metaData.js";
import { useAlert } from "react-alert";

const Dashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.vendorProducts);

  const { order: orders } = useSelector((state) => state.myOrders);

  const { user } = useSelector((state)=>state.user);

  // const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {

    if(user.role !== "vendor"){
      navigate('/')
      alert.show(`${user.role} is not allowed to access this page`);
    }

    dispatch(getVendorProduct());
    dispatch(vendorOrders());
    // dispatch(getAllUsers());
  }, [dispatch, user.role, alert, navigate]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/vendor/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/vendor/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            {/* <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link> */}
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
