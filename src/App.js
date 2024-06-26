import React, { useState } from 'react'
import './App.css'
import ProductList from './components/Product/ProductList'
import Cart from './components/Cart/Cart'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

function App() {
  const [cart, setCart] = useState([])
  const [saveForLater, setSaveForLater] = useState([])

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, { ...product, quantity: 1 }])
  }

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<ProductList addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} saveForLater={saveForLater} setSaveForLater={setSaveForLater} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
