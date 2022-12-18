import React, { useContext} from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import NoteContext from '../context/notes/NoteContext';
export default function NotesItem({note,updated}) {
  const context=useContext(NoteContext)
  const {deleteNotes}=context;
   

  
  return (
            
<>


          <div className='col-md-3'>
             
              <div className=" card my-3">
      
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="btn">
              <DeleteOutlineIcon onClick={()=>{deleteNotes(note._id)}}/>
              <BorderColorIcon onClick={()=>{updated(note)}}/>
          </div>
        
        </div>
      </div>
           
    </div>
    </>
  )
}
