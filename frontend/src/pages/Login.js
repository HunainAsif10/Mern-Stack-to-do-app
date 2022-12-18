import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import {Link} from "react-router-dom";
export default function Login() {
  const [credentials,setcredentials]=useState({email:"",password:""})

 const loginUser=async(email,password)=>{
  const response=await fetch(`http://localhost:5500/auth/loginUser`,{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({email:credentials.email,password:credentials.password})
  })
  const data=await response.json();
  console.log(data);
 }
  const handleClick=(e)=>{
    e.preventDefault();
    loginUser(credentials.email,credentials.password)
    setcredentials({email:"",password:""})

  }
  const handleChange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})

  }

  return (
    <div>
      <Navbar/>
      <div className=" my-3 container">
   
    
      <form >
  <div className="mb-3">
    <label htmlFor="email"  className="form-label">Email address</label>
    <input onChange={handleChange} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password"  className="form-label">Password</label>
    <input onChange={handleChange} type="password" name="password" className="form-control" id="password"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
<Link to="/register">
<button className="btn btn-dark my-4">Register</button>
</Link>
</div>
    </div>
  )
}
