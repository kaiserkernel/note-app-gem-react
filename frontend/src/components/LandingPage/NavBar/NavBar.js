import React, { useState } from 'react'
import './NavBar.css'
const NavBar = () => {
  const [open , setOpen] = useState(false);

  return (
    <div className= "navbar">
    <div className = "container flex">
      <div className='mobile-nav'>
        <div>
       <h3 className = "logo">Noteslify</h3>
       </div>
       <div className ="menu-display hidden" onClick={()=>setOpen(!open)}>
       <span className = {open ? '' :'hide'}>X</span>
       <span className={open ? 'hide':''}>☰</span>
       </div>
      </div> 
       <nav className= {open ? 'change' : ''}>
           <ul className = "flex">
               <li>Home</li>
               <li>Features</li>
               <li>Pricing</li>
               <li>Contact</li>
               <li>Dashboard</li>
           </ul>
           <button>Get Started</button>
       </nav> 
    </div>
</div>
  )
}

export default NavBar
