import { Fragment, useEffect } from "react"
import Loader from "../layout/Loader"
import MetaData from "../layout/metaData"
import { DataGrid } from '@material-ui/data-grid';
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../actions/orderAction";
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom'; 
import './myOrders.css';
import Header from '../layout/Header/Header.js'


const MyOrders = () =>{

    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading, error, order} = useSelector((state)=>state.myOrders);
    const {user} = useSelector((state)=>state.user);

    const columns = [
        {field: "id", headerName: "Order ID", minWidth: 300, flex: 1},
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                ? "greenColor" : "redColor"
            }
        },
        {
            field: "itemQty",
            headerName: "Item QTY",
            type: "number",
            minWidth: 150,
            flex: 0.3
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 150,
            flex: 0.5 
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) =>{
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    order && order.forEach((item, index) => {
        rows.push({
            itemQty: item.item.quantity,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        });
    });

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    },[dispatch, error, alert])
    return(
        <Fragment>
            <MetaData title={`${user.name} - orders`} />
            <Header />
            {
                loading ? (<Loader/>):(
                    <div className="myOrdersPage">
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={10}
                          disableSelectionOnClick
                          className="myOrdersTable"
                          autoHeight
                         />

                         <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                    </div>
                )
            }
        </Fragment>
    )
}

export default MyOrders;