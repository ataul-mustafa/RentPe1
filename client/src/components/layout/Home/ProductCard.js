import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating className="stars" {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}/day`} <div id="location"><LocationOnIcon className="icon"/>{product.city} </div></span>
    </Link>
  );
};

export default ProductCard;