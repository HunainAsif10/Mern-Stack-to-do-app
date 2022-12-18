import React,{useState} from 'react'
import Navbar from '../components/Navbar'

export default function Register() {
  const [credentials,setcredentials]=useState({name:"",email:"",password:""})
  const handleClick=async(e)=>{
    e.preventDefault();
    const response=await fetch(`http://localhost:5500/auth/createUser`,{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
    })
    const data=await response.json();
    console.log(data)
    setcredentials({name:"",email:"",password:""})

  }
  const handleChange=(e)=>{
    setcredentials({...credentials,[e.target.name]:e.target.value})

  }
  return (
    <div>

        <Navbar/>
         <div className="container my-3 mx-3 ">

        <form>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input name="name" onChange={handleChange} type="text" className="form-control" id="name" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input onChange={handleChange} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input onChange={handleChange}  name="password" type="password" className="form-control" id="password"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
         </div>
 
    </div>
  )
}
