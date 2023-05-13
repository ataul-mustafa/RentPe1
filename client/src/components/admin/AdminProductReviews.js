import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "../vendor/productReviews.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors, getAllProductsReviews,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/metaData";
import Star from "@mui/icons-material/Star";

import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");
  const [clicked, setClicked] = useState(false);
  


  const productReviewsSubmitHandler = (e) => {
    setClicked(true);
    e.preventDefault();
    if (productId.length === 24) {
      dispatch(getAllProductsReviews(productId));
    } else {
      alert.error("Enter accurate product id")
    }
  };

  useEffect(() => {
    if (clicked && error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    
  }, [dispatch, alert, error, navigate, productId, clicked]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 300, flex: 0.7 },

    {
      field: "user",
      headerName: "User",
      minWidth: 250,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 30,
      width: 30,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.3,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
