import './App.css'
import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'

function App() {
  const [products, setproducts] = useState([])


  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setproducts(data.products))
  }, [])

  return (
    <>
      <Header />
  
  <div className="product-grid">
  {products.map((p) => (
    <Card
      key={p.id}
      image={p.thumbnail}
       title={p.title}
      price={p.price}
    />
  ))}
</div>


      <Footer />
    </>
  )
}

export default App
