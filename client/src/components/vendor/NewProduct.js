import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/metaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TimerIcon from '@mui/icons-material/Timer';
import { Country, State, City } from 'country-state-city';
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import categories from "../Common Utilities/categoriesName";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";


const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [minDuration, setMinDuration] = useState(1);

  // const address = {
  //   country: "",
  //   state: "",
  //   city: "",
  // }

  const [city, setCity] = useState("")
  const [state, setState] = useState("");
  const [country, setCountry] = useState("")

  // const address = {
  //   country,
  //   state,
  //   city,
  // }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/vendor/product");
      dispatch({ type: NEW_PRODUCT_RESET });
      setName("");
      setPrice(null);
      setDescription("");
      setCategory("");
      setStock(null);
      setImages([]);
      setMinDuration(null);
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);
    myForm.set("minDuration", minDuration);
    myForm.set("country", country);
    myForm.set("state", state);
    myForm.set("city", city);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    // console.log(address);
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
      {
        loading ? <Loader /> :
          <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
              <SideBar />
              <div className="newProductContainer">
                <form
                  className="createProductForm"
                  encType="multipart/form-data"
                  onSubmit={createProductSubmitHandler}
                >
                  <h1>Create Product</h1>

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
                      type="number"
                      placeholder="Price"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <TimerIcon />
                    <input
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
                    <select onChange={(e) => setCategory(e.target.value)}>
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
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div>
                    <p>Enter Product availablity address below</p>
                  </div>

                  <div className="shippingCountry">
                    <AccountTreeIcon />

                    <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                      <option value={''}>Country</option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                        ))}
                    </select>
                  </div>
                  {country && (
                    <div className='shippingState'>
                      <AccountTreeIcon />

                      <select required value={state} onChange={(e) => setState(e.target.value)}>
                        <option value={''}>State</option>
                        {State &&
                          State.getStatesOfCountry(country).map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                          ))}
                      </select>
                    </div>
                  )}
                  {state && (
                    <div className='shippingState'>
                      <AccountTreeIcon />

                      <select required value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value={''}>City</option>
                        {City &&
                          City.getCitiesOfState(country, state).map((item) => (
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
                    {imagesPreview.map((image, index) => (
                      <img key={index} src={image} alt="Product Preview" />
                    ))}
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading ? true : false}
                  >
                    Create
                  </Button>
                </form>
              </div>
            </div>
          </Fragment>
      }
    </Fragment>
  );
};

export default NewProduct;
