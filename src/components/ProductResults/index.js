import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import { fetchProductsStart } from './../../redux/Products/products.actions';
import Product from './Product';
import FormSelect  from './../Forms/FormSelect';
import './styles.scss';

const mapState = ({ productsData }) => ({
  products: productsData.products
});

const ProductResults = ({ }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {filterType} = useParams();
  const { products } = useSelector(mapState);

  const {data, queryDoc, isLastPage} = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart({filterType})
    )
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  }

  
    const configFilters = {
      defaultValue: filterType,
      options : [{
          name: 'Show all',
          value: ''
      }, {
        name: 'Starters',
        value: 'starters'
      }, {
          name: 'Mains',
          value: 'mains'
      }, {
          name: 'Extras',
          value: 'extras'
      }],
      handleChange: handleFilter
    }

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <h1>
          No search results.
        </h1>
        <FormSelect {...configFilters}/>
      </div>
    );
  }

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc, 
        persistProducts: data
      })
    )
  }
  const configLoadMore = {
    onLoadMoreEvent: handleLoadMore,
  }

  return (
    <div className="products">
        <FormSelect {...configFilters}/>


     <div className="productResults">
        {data.map((product, pos) => {
          const { productThumbnail, productName, productPrice } = product;
          if (!productThumbnail || !productName ||
            typeof productPrice === 'undefined') return null;

          const configProduct = {
            ...product
          }

          return (
            <Product {...configProduct}/>
          );
        })}
        </div>
    </div>
  );
};

export default ProductResults;