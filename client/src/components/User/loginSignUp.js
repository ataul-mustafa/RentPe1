import React, { Fragment, useEffect, useState } from 'react';
import './loginSignup.css'

import { TextField, Box, Button, Typography, styled } from '@mui/material';
import Header from '../layout/Header/Header.js';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import avtr from "../images/profile-image.png"
import Loader from '../layout/Loader.js';
import { useNavigate } from 'react-router-dom';

import { useAlert } from 'react-alert'


import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction.js'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Component = styled(Box)`
    width: 100vw;
`;

// const Wrapper = styled(Box)`
    
// `;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

// const Error = styled(Typography)`
//     font-size: 10px;
//     color: #ff6161;
//     line-height: 0;
//     margin-top: 10px;
//     font-weight: 600;
// `


const Login = () => {
    
    const location = useLocation();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error, loading, isAuthenticated} = useSelector(state=>state.user);

    const [account, toggleAccount] = useState('login');

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    // ------------------
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password} = user;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(avtr);


    const loginSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
        setAvatarPreview(avtr);
    }

    const registerSubmit = (e) =>{
        e.preventDefault();

        let myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        
        dispatch(register(myForm));
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
            setUser({...user, [e.target.name]: e.target.value})
            setAvatar(avtr);
            setAvatarPreview(avtr);
        }
    }

    const redirect = location.search ? "/shipping" : "/account";


    useEffect(()=>{
        if (error) {
            alert.show(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated){
            navigate(redirect)
        }
    }, [dispatch, error, alert, navigate, isAuthenticated, redirect])



    return (
        <Fragment>
            {loading ? <Loader />:
              <Component>
              <Header />
              <div className='loginSignup'>
                  <Box>
                      {
                          account === 'login' ?
                              <form id='wrapperBox' onSubmit={loginSubmit} encType="application/json">
                                  <TextField onChange={(e=> setLoginEmail(e.target.value))} value={loginEmail} variant="standard" name='username' label='Enter Username' required />
                                  <FormControl sx={{ width: '31.5ch' }} variant="standard" required={true} >
                                      <InputLabel htmlFor="standard-adornment-password">Enter Password</InputLabel>
                                      <Input
                                          onChange={(e=> setLoginPassword(e.target.value))}
                                          value={loginPassword}
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
                                          required
                                      />
                                  </FormControl>
  
                                  <input id='loginButton' type='submit' value='Login' />
                                  <Text style={{ textAlign: 'center' }}>OR</Text>
                                  <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>Create an account</SignupButton>
                                  <Link to='/password/forgot' className='forgotPass'>Forgot Password ?</Link>
                              </form> :
                              <form id='wrapperBox' onSubmit={registerSubmit} encType="multipart/form-data">
                                  <TextField value={name} onChange={registerDataChange} variant="standard" name='name' label='Enter Name' required />
                                  <TextField value={email} onChange={registerDataChange} variant="standard" name='email' label='Enter Email' required />
                                  <FormControl sx={{ width: '31.5ch' }} variant="standard" required={true} >
                                      <InputLabel htmlFor="standard-adornment-password">Enter Password</InputLabel>
                                      <Input
                                          name='password'
                                          onChange={registerDataChange}
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
      
                                  <div id='registerImage'>
                                      <img src={avatarPreview} alt="Avatar-Preview" />
                                      <input accept="image/*" name='avatar' type="file" onChange={registerDataChange} />
                                  </div>
  
                                  {/* <SignupButton onClick={registerSubmit}>Signup</SignupButton> */}
                                  <input id='signupButton' type='submit' value='SignUp' disabled={loading ? true : false} />
                                  <Text style={{ textAlign: 'center' }}>OR</Text>
                                  <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                              </form>
                      }
                  </Box>
              </div>
          </Component>
            }
        </Fragment>
    )
}

export default Login;