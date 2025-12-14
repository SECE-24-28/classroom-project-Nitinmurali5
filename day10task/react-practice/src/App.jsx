import React from 'react'
import {useState,useEffect} from 'react'
import "./App.css"

function App() {
  const [products,setproducts]=useState([])
  useEffect(()=>{
     fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(data => setproducts(data));
    },[])

  return (
    <>
    <div className="product-grid">
      {
      products.map((p)=>
        {
        return <div className="product-card" key={p.id}>
          <img src={p.image} alt=""></img>
      
          <p>{p.title}</p>
          <p>{p.price}</p>
          <p>{p.description}</p>
        </div>
      
      })
    }

    </div>
    
    
    </>
  )
}

export default App;

// import './App.css'
// import Demo from './Demo.jsx' 
// import Header from './components/Header.jsx'
// import Card from './components/Card.jsx'
// import { useState ,useEffect } from 'react'  

// function App() {
//   const [products,setproducts]=useState([])
// //useEffect is used to fetch the data from the api and store it in the state
//   useEffect(()=>{
    
//      fetch('https://fakestoreapi.com/products')
//   .then(res=>res.json())
//   .then(data=>setproducts(data))
//   },[])

 
//     return(
//       <>
//       <h1>ecommerce</h1>
//       {
//         products.map((p)=>{
//           return <div>
//             <img src={p.image} alt=""></img>
//             <p>{p.title}</p>
//             <p>{p.price}</p>
//           </div>
//         })
//       }
//       </>
//     )

  //example of useState (count btn whoich increments on clicking it)
//   const [count,setcount]=useState(0)
//   const [secondbtn,setsecondbtn]=useState(1)
//   function handlecount(){
//     setcount(count=>count+1);  //setcount() takes the values and assign it to the variable count
//   }
  
//   function diff(){
//     setsecondbtn(count=>count-1);  //setcount() takes the values and assign it to the variable count
//   }

//  function magic(){
//    setname(name=>name+"hi");
//  }

//   return(
//     <>
//     <button onClick={handlecount}>Count {count}</button>
//     <button onClick={diff}>Count{secondbtn}</button>
//     <p onMouseOver={magic}>Nitin</p>
//     </>
//   )
// }

//------------------------------------------------------------------------------------------------------------

//Basic iamge and data
//   return (
//     <>
//     <Header/>
//     <Card/>
//     <Card movie="Master" rating="5" image="https://tse3.mm.bing.net/th/id/OIP.bdni97fJJZWR64TV4IBkPwHaI5?pid=Api&P=0&h=180"/> { /this is how we can pass the props to the component/}
//      <button onClick={add()}>Count {a}</button>
//     </>
//   )
// }

// export default App;