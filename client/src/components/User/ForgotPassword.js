import { Fragment, useState, useEffect } from "react";
import './UpdateProfile.css';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import { TextField } from "@mui/material";
import MetaData from "../layout/metaData";




const ForgotPassword = () => {



    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, message, loading } = useSelector(state => state.forgotPassword);


    const [email, setEmail] = useState();


    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        let myForm = new FormData();

        myForm.set("email", email);

        dispatch(forgotPassword(myForm));
    }




    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message){
            alert.success(message)
        }

    }, [dispatch, error, alert, message])


    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title="Forgot Password" />
                <div className="updateProfileContainer">
                    <div className="updateProfileBox">
                        <h2 className="updateHeader">Forgot Password</h2>

                        <form className="updateProfileForm" onSubmit={forgotPasswordSubmit} encType="multipart/form-data">

                            <div className="updateProfileEmail">
                                <TextField className="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} variant="standard" name='email' label='Enter Email' required />
                            </div>

                            <input id='updateProfileButton' type='submit' value='Send Email' disabled={loading ? true : false} />
                        </form>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

// onChange={(e)=>setName(e.target.value)}

export default ForgotPassword;