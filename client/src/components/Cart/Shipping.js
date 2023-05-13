import './Shipping.css'
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
// import PinDropIcon from '@mui/icons-material/PinDrop';
// import HomeIcon from '@mui/icons-material/Home';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import PublicIcon from '@mui/icons-material/Public';
// import PhoneIcon from '@mui/icons-material/Phone';
// import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Country, State, City } from 'country-state-city';
import { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Header from '../layout/Header/Header.js'
import MetaData from '../layout/metaData';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps.js'


const Shipping = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [state, setState] = useState(shippingInfo.state);
    const [pinCode, setPincode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNp] = useState(shippingInfo.phoneNo);
    const [country, setCountry] = useState(shippingInfo.country)

    const [available, setAvailable] = useState(true);

    useEffect(()=>{
        for (let i=0; i<cartItems.length; i++){
            if(cartItems[i].city !== city){
                alert.error(`product ${cartItems[i].name} is not available in your city`);
                setAvailable(false);
                break;
            } else {
                setAvailable(true);
            }
            
        }
    }, [alert, cartItems, city])

    const shippingSubmit = (e)=>{
        e.preventDefault();

        if(phoneNo.length < 10 || phoneNo.length > 10){
            alert.show("Phone no. must contains 10 digits");
            return;
        }

        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo})
        );
        navigate("/order/confirm");
    }

    return (
        <Fragment>
            <MetaData title='shipping Detail' />
            <Header />
            <CheckoutSteps activeStep={0} />
            <div className='shippingContainer'>
                <div className='shippingBox'>
                    <h2 className='shippingHeading'>Shipping Details</h2>
                    <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>
                        <div className="shippingAdress">
                            <input type='text' className="addressInput" value={address} onChange={(e)=>setAddress(e.target.value)}  name='name' placeholder='Enter Address' required />
                        </div>
                        {/* <div className="shippingCity">
                            <input type='text' className="cityInput" value={city} onChange={(e)=>setCity(e.target.value)}  name='email' placeholder='Enter City' required />
                        </div> */}
                        <div className="shippingCity">
                            <input type='number' className="pinCodeInput" value={pinCode} onChange={(e)=>setPincode(e.target.value)}  name='email' placeholder='Enter Pin Code' required />
                        </div><div className="shippingPhone">
                            <input type='number' size="10" className="phoneInput" value={phoneNo} onChange={(e)=>setPhoneNp(e.target.value)}  name='email' placeholder='Enter Phone No.' required />
                        </div>
                        <div className="shippingCountry">
                            <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value={''}>Country</option>
                                {Country &&
                                   Country.getAllCountries().map((item)=>(
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                   ))}
                            </select>
                        </div>
                        {country && (
                            <div className='shippingState'>
                                <select required value={state} onChange={(e)=>setState(e.target.value)}>
                                    <option value={''}>State</option>
                                    {State && 
                                      State.getStatesOfCountry(country).map((item)=>(
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                      ))}
                                </select>
                            </div>
                        )}
                        {state && (
                            <div className='shippingState'>
                                <select required value={city} onChange={(e)=>setCity(e.target.value)}>
                                    <option value={''}>City</option>
                                    {City && 
                                      City.getCitiesOfState(country, state).map((item)=>(
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                      ))}
                                </select>
                            </div>
                        )}
                        <input type='submit' value='Continue' className='shippingBtn' disabled = {state && available ? false : true} />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping;