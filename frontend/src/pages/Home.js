import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Notes from "../components/Notes";
import NoteContext from "../context/notes/NoteContext";
export default function Home() {
  const context=useContext(NoteContext)
  const {addNotes}=context;
  const [notes,setNotes]=useState({title:"",description:"",tag:""})
   

  const handleClick=(e)=>{
    e.preventDefault();

     addNotes(notes.title,notes.description,notes.tag)
        setNotes({title:"",description:"",tag:""})
  }
  const handleChange=(e)=>{
    setNotes({...notes,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
            onChange={handleChange}
              type="text"
              name="title"
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              onChange={handleChange}
              name="description"
              type="text"
              className="form-control"
              id="description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              onChange={handleChange}
              name="tag"
              type="tag"
              className="form-control"
              id="tag"
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
      <div className="notes container">
        <Notes/>
      </div>
    </div>
  );
}
