import { Fragment, useState, useEffect } from "react";
import './UpdateProfile.css';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/metaData";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Loader from '../layout/Loader.js';




const UpdatePassword = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector(state => state.profile);

    const [oldPass, setOldPass] = useState();
    const [newPass, setNewPass] = useState();
    const [conPass, setConPass] = useState();


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        let myForm = new FormData();

        myForm.set("oldPassword", oldPass);
        myForm.set("newPassword", newPass);
        myForm.set("confirmPassword", conPass);

        dispatch(updatePassword(myForm));
    }




    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password Updated Successfully");
            dispatch(loadUser);

            navigate("/account")
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }
    }, [dispatch, error, alert, isUpdated, navigate])


    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
            <MetaData title='Update Password' />
                <div className="updateProfileContainer">
                    <div className="updateProfileBox">
                        <h2 className="updateHeader">Update Password</h2>

                        <form className="updateProfileForm" onSubmit={updatePasswordSubmit} encType="multipart/form-data">

                            <FormControl sx={{ width: '30ch' }} variant="standard" required={true} >
                                <InputLabel htmlFor="standard-adornment-password">Enter Old Password</InputLabel>
                                <Input
                                    name='password'
                                    onChange={(e)=>setOldPass(e.target.value)}
                                    value={oldPass}
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="on"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                            </FormControl>
                            <FormControl sx={{ width: '30ch' }} variant="standard" required={true} >
                                <InputLabel htmlFor="standard-adornment-password1">Enter Password</InputLabel>
                                <Input
                                    name='password'
                                    onChange={(e)=>setNewPass(e.target.value)}
                                    value={newPass}
                                    id="standard-adornment-password1"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="on"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                            </FormControl>
                            <FormControl sx={{ width: '30ch' }} variant="standard" required={true} >
                                <InputLabel htmlFor="standard-adornment-password2">Enter Password</InputLabel>
                                <Input
                                    name='password'
                                    onChange={(e)=>setConPass(e.target.value)}
                                    value={conPass}
                                    id="standard-adornment-password2"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="on"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                            </FormControl>

                            <input id='updateProfileButton' type='submit' value='Update' disabled={loading ? true : false} />
                        </form>

                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

// onChange={(e)=>setName(e.target.value)}

export default UpdatePassword;