import { Fragment, useState, useEffect } from "react";
import './UpdateProfile.css';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Loader from '../layout/Loader.js';
import { useParams } from "react-router-dom";
import MetaData from "../layout/metaData";




const ResetPassword = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { token } = useParams();

    const { error, success, loading } = useSelector(state => state.forgotPassword);

    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        let myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));
    }




    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Reseted Successfully");
            dispatch(loadUser);

            navigate("/login")
        }
    }, [dispatch, error, alert, success, navigate])


    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title='Reset Password' /> 
                <div className="updateProfileContainer">
                    <div className="updateProfileBox">
                        <h2 className="updateHeader">Reset Password</h2>

                        <form className="updateProfileForm" onSubmit={updatePasswordSubmit} encType="multipart/form-data">

                            <FormControl sx={{ width: '30ch' }} variant="standard" required={true} >
                                <InputLabel htmlFor="standard-adornment-password">Enter New Password</InputLabel>
                                <Input
                                    name='password'
                                    onChange={(e)=>setPassword(e.target.value)}
                                    value={password}
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
                                <InputLabel htmlFor="standard-adornment-password2">confirm Password</InputLabel>
                                <Input
                                    name='password'
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
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

                            <input id='updateProfileButton' type='submit' value='Reset' disabled={loading ? true : false} />
                        </form>

                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

// onChange={(e)=>setName(e.target.value)}

export default ResetPassword;