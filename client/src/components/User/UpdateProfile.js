import { Fragment, useState, useEffect } from "react";
import './UpdateProfile.css';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile } from "../../actions/userAction.js";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";

import { TextField } from '@mui/material';
import Loader from "../layout/Loader";
import MetaData from "../layout/metaData";




const UpdateProfile = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector(state => state.user);
    const { error, isUpdated, loading } = useSelector(state => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState()


    const updateProfileSubmit = (e) => {
        e.preventDefault();

        let myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);

        dispatch(updateProfile(myForm));
    }
 
    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);

    }

    useEffect(() => {
        if(!isAuthenticated){
            navigate("/login");
        }        
        
        if (!isUpdated) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }
        if (error) {
            alert.show(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            // dispatch(loadUser());
            // navigate("/account")
            window.location.replace('/account');
            alert.success("Profile Updated Successfully");
            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }
    }, [isAuthenticated, dispatch, error, alert, isUpdated, navigate, user.name, user.email, user.avatar.url])


    return (
        <Fragment>
            {loading ? <Loader />:<Fragment>
            <MetaData title='Update Profile' />
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                    <h2 className="updateHeader">Update Profile</h2>

                    <form className="updateProfileForm" onSubmit={updateProfileSubmit} encType="multipart/form-data">
                        <div className="updateProfileName">
                            <TextField className="nameInput" value={name} onChange={(e)=>setName(e.target.value)} variant="standard" name='name' label='Enter Name' required />
                        </div>
                        <div className="updateProfileEmail">
                            <TextField className="emailInput" value={email} onChange={(e)=>setEmail(e.target.value)} variant="standard" name='email' label='Enter Email' required />
                        </div>

                        <div className='updateProfileImage'>
                            <img src={avatarPreview} alt="Avatar-Preview" />
                            <input accept="image/*" name='avatar' type="file" onChange={updateProfileDataChange} />
                        </div>
                        <input id='updateProfileButton' type='submit' value='Update' disabled={loading ? true : false} />
                    </form>

                </div>
            </div>
        </Fragment>}
        </Fragment>
    )
}

export default UpdateProfile;