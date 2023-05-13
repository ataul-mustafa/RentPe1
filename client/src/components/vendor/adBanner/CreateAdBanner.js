import React, { Fragment, useEffect, useState } from 'react';
import '../../User/loginSignup.css'

import { CREATE_ADBANNER_RESET } from '../../../constants/adBannerConstant';
import { TextField, Box, styled } from '@mui/material';
import avtr from "../../images/profile-image.png"
import Loader from '../../layout/Loader';
import { useNavigate } from 'react-router-dom';

import { useAlert } from 'react-alert'

import { useDispatch, useSelector } from 'react-redux';
import { createAdBanner, clearErrors } from '../../../actions/adBannerAction';

const Component = styled(Box)`
    width: 100vw;
`;

const CreateAdBanner = () => {
    
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error, success, loading} = useSelector(state=>state.adBanner);

    // ------------------

    const [banner, setBanner] = useState({
        heading: "",
        description: "",
        productId: "",
        duration: 0,
    });

    const { heading, description, productId, duration} = banner;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(avtr);


    const registerSubmit = (e) =>{
        e.preventDefault();

        let myForm = new FormData();
 
        myForm.set("heading", heading);
        myForm.set("description", description);
        myForm.set("productId", productId);
        myForm.set("avatar", avatar);
        myForm.set("duration", duration);
        
        dispatch(createAdBanner(myForm));
    }


    const registerDataChange = (e) =>{
        if (e.target.name === 'avatar'){
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }else {
            setBanner({...banner, [e.target.name]: e.target.value})
            setAvatarPreview(avtr);
        }
    }

    // const redirect = location.search ? "/shipping" : "/account";


    useEffect(()=>{
        if (error) {
            alert.show(error);
            dispatch(clearErrors());
        }
        if(success){
            dispatch({ type: CREATE_ADBANNER_RESET});
            alert.show("Banner Added successfully")
            navigate('/');
        }
    }, [dispatch, error, alert, navigate, success])



    return (
        <Fragment>
            {loading ? <Loader />:
              <Component>
              <div className='loginSignup'>
                  <Box>
                              <form id='wrapperBox' onSubmit={registerSubmit} encType="multipart/form-data">
                                  <TextField value={heading} onChange={registerDataChange} variant="standard" name='heading' label='Write Heading' required />
                                  <TextField value={description} onChange={registerDataChange} variant="standard" name='description' label='Write Description' required />
                                  <TextField value={productId} onChange={registerDataChange} variant="standard" name='productId' label='Enter ProductId' required />
                                  <TextField value={duration} onChange={registerDataChange} variant="standard" name='duration' label='Enter duration in days' type='number' required />
      
                                  <div id='registerImage'>
                                      <img src={avatarPreview} alt="Avatar-Preview" />
                                      <input accept="image/*" name='avatar' type="file" onChange={registerDataChange} />
                                  </div>
  
                                  <input id='signupButton' type='submit' value='Submit' disabled={loading ? true : false} />
                              </form>
                  </Box>
              </div>
          </Component>
            }
        </Fragment>
    )
}

export default CreateAdBanner;