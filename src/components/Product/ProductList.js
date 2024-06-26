import React, { useEffect, useState } from 'react'
import Product from './Product'
import './ProductList.css'
import { Link } from 'react-router-dom'

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error))
  }, [products])

  return (
    <>
    <header className="header">
    <h2>Welcome to the store</h2>
    <Link to="/cart" style={{color:'White'}}><h5>Go to Cart</h5></Link>
    </header>
      
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
    </>
    
  )
}

export default ProductList
