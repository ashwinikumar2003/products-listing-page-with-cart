import React from 'react'
import './CartItem.css'

function CartItem({ item, onQuantityChange, onDelete, onSaveForLater }) {
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10)
    onQuantityChange(item.id, newQuantity)
  }

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h2>{item.title}</h2>
        <p>₹{item.price}</p>
        <p>In Stock</p>
        <label>
          Qty:
          <select value={item.quantity} onChange={handleQuantityChange}>
            {[...Array(10).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>
        <button onClick={() => onDelete(item.id)}>Delete</button>
        <button onClick={() => onSaveForLater(item.id)}>Save for Later</button>
      </div>
    </div>
  )
}

export default CartItem
