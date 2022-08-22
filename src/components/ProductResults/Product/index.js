import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import Button from './../../Forms/Button';
import {useDispatch} from 'react-redux';
import {addProduct} from './../../../redux/Cart/cart.actions';

const Product = (product) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    documentID,
    productThumbnail,
    productName,
    productPrice
  } = product;

  if (!documentID || !productThumbnail || !productName ||
    typeof productPrice === 'undefined') return null;

    const configAddToCartButton = {
      type: 'button'
    }

    const handleAddToCart = (product) => {
      if(!product) return;
      dispatch(
        addProduct(product)
      )
      history.push('/cart');
    }

  return (
    <div className="product">
      <div className="details">
        <ul>
          <li>
            <span className="name">
             {productName}
            </span>
          </li>
          <li>
            <span className="price">
              £{productPrice}
            </span>
            <div className ="addToCart">
            <Button {...configAddToCartButton} onClick={() => handleAddToCart(product)}>
            <i class="fa fa-cart-plus" aria-hidden="true"></i>
            </Button>
            </div>
          </li>
        </ul>
          
          
      </div>

    </div>
  )}
  


export default Product;