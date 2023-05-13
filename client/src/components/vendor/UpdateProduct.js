import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct, getProductDetails } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/metaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimerIcon from '@mui/icons-material/Timer';
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import { Country, State, City } from 'country-state-city';

import categories from '../Common Utilities/categoriesName'


const NewProduct = () => {
  const {id} = useParams();
  const productId = id;
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { product, error } = useSelector((state) => state.productDetails);  
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

// let product = Object.create(productDetail).toString();
//  const address = product.address;
//  const {country:count, state:sta, city:cit} = product.address;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [minDuration, setMinDuration] = useState(1);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  // const categories = [
  //   "Laptop",
  //   "Footwear",
  //   "Bottom",
  //   "Tops",
  //   "Attire",
  //   "Camera",
  //   "SmartPhones",
  // ];

  // useEffect(()=>{
  //   if(address.country){
  //     setCountry(count)
  //     setState(sta)
  //     setCity(cit)
  //   } 
  // },[address, count, sta, cit]);

  useEffect(()=>{
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setMinDuration(product.minDuration);
      setOldImages(product.images);
      setCountry(product.country);
      setState(product.state);
      setCity(product.city);
      
  },[product])

  useEffect(() => {

    if ((product && productId !== product._id)){
      dispatch(getProductDetails);
    }
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/vendor/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("minDuration", minDuration)
    myForm.set("country",country);
    myForm.set("state",state);
    myForm.set("city",city);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages();

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
              value={price}
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <TimerIcon />
              <input
              value={minDuration}
                type="number"
                placeholder="Min Duration"
                required
                onChange={(e) => setMinDuration(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="shippingCountry">
                            <select value={country} onChange={(e) => setCountry(e.target.value)}>
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

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
