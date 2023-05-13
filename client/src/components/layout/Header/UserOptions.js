import './UserOptions.css'
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { Fragment, useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import profile from "../../images/profile-image.png"
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

const UserOptions = ({ user }) => {
    const userImage = user.avatar.url ? user.avatar.url : profile;

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const options = [
        {icon: <ListAltIcon />, name: "Orders", func: orders},
        {icon: <PersonIcon />, name: "Profile", func: account},
        {icon: <ExitToAppIcon />, name: "Logout", func: logOut},
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: adminDashboard,
        });
    }

    if (user.role === "vendor") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: vendorDashboard,
        });
    }

    function adminDashboard(){
        navigate("/admin/dashboard");
    } 

    function vendorDashboard(){
        navigate("/vendor/dashboard");
    } 
    function orders(){
        navigate("/orders");
    }

    function account() {
        navigate("/account")
    }

    function logOut() {
        navigate("/")
        dispatch(logout());
        alert.success("Logged out Successfully")
    }

    return (
        <Fragment>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                className='speedDail'
                icon={
                    <img className="speedDialIcon"
                        src={userImage}
                        alt="Profile" />}
            >
            
            {options.map((item)=>(
                <SpeedDialAction key={item.name} className='options' icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
            ))}
            </SpeedDial>
        </Fragment >)
}

export default UserOptions;