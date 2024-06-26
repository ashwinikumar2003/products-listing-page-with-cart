import React, { useState } from 'react'
import './Cart.css'
import { Link } from 'react-router-dom'

function Cart({ cart, setCart, saveForLater, setSaveForLater }) {
  const [selectedProducts, setSelectedProducts] = useState([])

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const handleQuantityChange = (id, quantity) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: quantity } : item
    ))
  }

  const handleSaveForLater = (id) => {
    const item = cart.find(item => item.id === id)
    setSaveForLater([...saveForLater, item])
    setCart(cart.filter(item => item.id !== id))
  }

  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pid => pid !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  const handleRemoveSelected = () => {
    setCart(cart.filter(item => !selectedProducts.includes(item.id)))
    setSelectedProducts([])
  }

  const totalAmount = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0)

  return (
    <>
    <header className="header">
    <h2>Welcome to the Cart</h2>
    <Link to="/" style={{color:'White'}}><h5>Go to Store</h5></Link>
    </header>

    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <input
            type="checkbox"
            checked={selectedProducts.includes(item.id)}
            onChange={() => handleSelectProduct(item.id)}
          />
          <img src={item.image} alt={item.title} className="cart-item-image" />
          <div className="cart-item-details">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <div>
              <label htmlFor={`quantity-${item.id}`}>Qty:</label>
              <input
                type="number"
                id={`quantity-${item.id}`}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                min="1"
              />
            </div>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
            <button onClick={() => handleSaveForLater(item.id)}>Save for Later</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
      </div>
      <button onClick={handleRemoveSelected}>Remove Selected Items</button>
      <h2>Saved for Later</h2>
      {saveForLater.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} className="cart-item-image" />
          <div className="cart-item-details">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => setCart([...cart, item])}>Move to Cart</button>
          </div>
        </div>
      ))}
    </div>
    </>
    
  )
}

export default Cart
