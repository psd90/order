import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductStart, setProduct} from './../../redux/Products/products.actions';
import {addProduct} from './../../redux/Cart/cart.actions'
import Button from './../Forms/Button';
import './styles.scss'

const mapState = state => ({
    product: state.productsData.product
})

const ProductCard = ({}) => {
    const dispatch = useDispatch();
    const {productID} = useParams();
    const {product} = useSelector(mapState);
    const {
        productThumbnail,
        productPrice,
        productName,
        productDesc
    } = product;

    useEffect(() => {
        dispatch(
            fetchProductStart(productID)
        )
        return () => {
            dispatch(
                setProduct({})
            )
        }
    }, []);

        const handleAddToCart = (product) => {
            if(!product) return;
            dispatch(
                addProduct(product)
            )
        }

        const configAddToCartButton ={
            type: 'button'
        }

    return (
        <div className="productCard">
            <div className="hero">
                <img src={productThumbnail}/>
            </div>
            <div className="productDetails">
                <ul>
                    <li>
                        <h1>
                            {productName}
                        </h1>
                    </li>
                    <li>
                        <span>
                            £{productPrice}
                        </span>
                    </li>
                    <li>
                        <div className="addToCart">
                            <Button {...configAddToCartButton} onClick={() => handleAddToCart(product)}>
                                Add To Basket
                            </Button>
                        </div>
                    </li>
                    <li>
                        <span dangerouslySetInnerHTML= {{__html:productDesc}} />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductCard;