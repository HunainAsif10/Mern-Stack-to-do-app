import React, {useState,useRef ,useContext, useEffect} from 'react'
import NotesItem from './NotesItem'
import NoteContext from '../context/notes/NoteContext'
export default function Notes() {
  const context=useContext(NoteContext)
  const {getNotes}=context;

  useEffect(()=>{
    getNotes();
  })
   const ref=useRef(null)
  const {notes,editNotes}=context;
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const refClose=useRef(null)

  const handleClick=(e)=>{

    refClose.current.click();
    editNotes(note.id,note.etitle,note.edescription,note.etag)
    e.preventDefault();
  }
  const updated=(currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

  }
  const handleChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

  return (
    <div className='row container'>
        <h1>Your Notes</h1>
        <div>
  

  <button type="button" ref={ref} className="btn d-none btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>


  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
            value={note.etitle}
            onChange={handleChange}
              type="text"
              name="etitle"
              className="form-control"
              id="etitle"
              aria-describedby="emailHelp"
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
            value={note.edescription}
              onChange={handleChange}
              name="edescription"
              type="text"
              className="form-control"
              id="edescription"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              onChange={handleChange}
              value={note.etag}
              name="etag"
              type="text"
              className="form-control"
              id="etag"
            />
          </div>

          <button ref={refClose} type="submit" className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
        </div>
        
      </div>
    </div>
  </div>
</div>
        {/* {notes.map((note)=>{
          return ( <NotesItem key={note._id} note={note}/>)

        })} */}
          {notes.map((note) => {
                    return <NotesItem key={note._id} updated={updated}   note={note} />
            })}

    </div>
  )
}
