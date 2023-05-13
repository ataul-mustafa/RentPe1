import React, { Fragment } from 'react'
import './footer.css'
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png'

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
    return (
        <Fragment>
            <div className="footer">
                <div className="col">
                    <img className="footer-logo" src={logo} alt="RentPe" />
                        <h4>Contact</h4>
                        <p><strong>Address:</strong> Vill.-Bahadur Ganj, Moradabad UP 244601</p>
                        <p><strong>Phone:</strong> +917983732026</p>
                        <p><strong>Hours:</strong> 10:00 - 18:00, Mon - Sat</p>
                        <div className="follow">
                            <h4>Follow Us</h4>
                            <div className="icon">
                                <FacebookIcon />
                                <InstagramIcon />
                                <TwitterIcon />
                            </div>
                        </div>
                </div>
                <div className="col">
                    <h4>About</h4>
                    <Link to={'/'}>About Us</Link>
                    <Link to={'/'}>Delivery information</Link>
                    <Link to={'/'}>Privacy Policy</Link>
                    <Link to={'/'}>Terms & Conditions</Link>
                    <Link to={'/'}>Contact Us</Link>
                </div>
                <div className="col">
                    <h4>My Acccount</h4>
                    <Link to={'/'}>Sign in</Link>
                    <Link to={'/'}>View Cart</Link>
                    <Link to={'/'}>My Wishlist</Link>
                    <Link to={'/'}>Track My Order</Link>
                    <Link to={'/'}>Help</Link>
                </div>
                {/* <div className="col install">
                    <h4>Install App</h4>
                    <p>From App Store or Google Play</p>
                    <div className="row">
                        <img src="/img/pay/app.jpg" alt="App Store" />
                            <img src="/img/pay/play.jpg" alt="Play Store" />
                            </div>
                            <p>Secure Payment Gateways</p>
                            <img src="/img/pay/pay.png" alt="Payment" />
                            </div>
                            <div className="copyright">
                                <p>© 2021, All copyright reserved RentPe</p>
                 </div> */}
                        </div> 
                    </Fragment>
            )
}

export default Footer