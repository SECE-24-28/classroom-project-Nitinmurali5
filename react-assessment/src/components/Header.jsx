import React from "react";
import ReactLogo from "../assets/react.svg"; 

function Header() {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 20px",
      backgroundColor: "#111",
      color: "white"
    }}>
      <div style={{ display: "flex", alignItems: "center"}}>
        <img src={ReactLogo} alt="logo" width="40" />
        <h2 style={{ margin: 0 }}>E-Kart</h2>
      </div>

      <nav style={{ display: "flex", gap: "20px" }}>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>Home</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>Products</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>Cart</a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>Contact</a>
      </nav>
    </header>
  )
}

export default Header;
