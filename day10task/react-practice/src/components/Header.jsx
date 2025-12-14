import React from 'react'
import ReactLogo from '../assets/react.svg'
function Header(){

    return(
        <>
        
           <header style={{display:"flex",justifyContent:"space-between",border:"1px solid black",backgroundColor:"grey"}}>
            <img src={ReactLogo} alt="logo"></img>
            <nav>
                <a href="">Home</a>
                <a href="">About</a>
                <a href="">Movies</a>
                <a href="">Contact</a>
            </nav>
           </header>
           
        </>
    )
}
export default Header