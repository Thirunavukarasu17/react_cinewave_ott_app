import React, { useEffect, useState } from'react'
import logo from'./Cine.png'
import './Nav.css'
const  Nav= () => {
  const [show,setShow]=useState(false)

  useEffect(()=>{
  window.addEventListener("scroll",()=>{
    if (window.scrollY>150){
      setShow(true);
    }
    else setShow(false);
  });
    return ()=>{
    window.removeEventListener("scroll",null);
  };
  },[]);

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <img src={logo} alt="logo" className="nav-logo" />
    </div>
  )
}

export default Nav;