import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getProductDetails,
  getVendorProduct,
} from "../../actions/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/metaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.vendorProducts);

  const { error: deleteError, isDeleted, loading } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const editProductHandler = (id) =>{
    dispatch(getProductDetails(id));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/vendor/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getVendorProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 250, flex: 0.7 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 230,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 190,
      flex: 0.4,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 200,
      flex: 0.4,
    },

    {
      field: "actions",
      flex: 0.4,
      headerName: "Actions",
      minWidth: 180,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/vendor/product/${params.getValue(params.id, "id")}`}>
              <EditIcon onClick={() =>
                editProductHandler(params.getValue(params.id, "id"))
              } />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      { 
        loading ? <Loader /> :
        <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
      }
    </Fragment>
  );
};

export default ProductList;
