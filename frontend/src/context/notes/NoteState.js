import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
//     const notesInitial=[
//     // {
//     //   "_id": "6383a78a1cf165a0836c7761",
//     //   "title": "Chemistry",
//     //   "description": "Biology is a good Subject",
//     //   "tag": "Biology",
//     //   "createdAt": "2022-11-27T18:08:10.440Z",
//     //   "updatedAt": "2022-11-27T18:08:10.440Z",
//     //   "__v": 0
//     // },
//     // {
//     //   "_id": "6383a7901cf165a0836c7763",
//     //   "title": "COmputer",
//     //   "description": "Biology is a good Subject",
//     //   "tag": "Biology",
//     //   "createdAt": "2022-11-27T18:08:16.939Z",
//     //   "updatedAt": "2022-11-27T18:08:16.939Z",
//     //   "__v": 0
//     // },
//     // {
//     //   "_id": "6383a7951cf165a0836c7765",
//     //   "title": "Math",
//     //   "description": "Biology is a good Subject",
//     //   "tag": "Biology",
//     //   "createdAt": "2022-11-27T18:08:21.358Z",
//     //   "updatedAt": "2022-11-27T18:08:21.358Z",
//     //   "__v": 0
//     // },
//     // {
//     //   "_id": "6383a7a317d7b3b656aff9bd",
//     //   "title": "English",
//     //   "description": "Biology is a good Subject",
//     //   "tag": "Biology",
//     //   "createdAt": "2022-11-27T18:08:35.248Z",
//     //   "updatedAt": "2022-11-27T18:08:35.248Z",
//     //   "__v": 0
//     // }
//   ]
  const [notes,setNotes]=useState([]);
//   getNotes
const getNotes=async()=>{
    const response=await fetch(`http://localhost:5500/notes/getNotes`,{
        method:"GET",
        headers:{
            "Content-type":"application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4M2E2MDJjMTJkNjQ1ZTdkNzA3OTU1IiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTY2OTU3MjE4MX0.NOHq_7EstxgT_ITIlfwPzCYep3p7JgwlxDiMsLrrZf8"
        }
    })
    const data=await response.json();
    
    setNotes(data.notes)

}
// addNotes
const addNotes=async(title,description,tag)=>{
    const response=await fetch(`http://localhost:5500/notes/createNote`,{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4M2E2MDJjMTJkNjQ1ZTdkNzA3OTU1IiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTY2OTU3MjE4MX0.NOHq_7EstxgT_ITIlfwPzCYep3p7JgwlxDiMsLrrZf8"
        },
        body:JSON.stringify({title,description,tag})

    })
    const data=await response.json();
    console.log(data)
  
    setNotes(notes.concat(data))

}
// deleteNotes
const deleteNotes=async(id)=>{
   
    const response=await fetch(`http://localhost:5500/notes/deleteNotes/${id}`,{
        method:"DELETE",
    headers:{
        "Content-type":"application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4M2E2MDJjMTJkNjQ1ZTdkNzA3OTU1IiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTY2OTU3MjE4MX0.NOHq_7EstxgT_ITIlfwPzCYep3p7JgwlxDiMsLrrZf8"
    }   
 })
 const data=await response.json();
 setNotes(notes.filter(notes=>(notes._id!==id)))
 console.log(data)

}
// editNotes
const editNotes=async(id,title,description,tag)=>{
    const response=await fetch(`http://localhost:5500/notes/updateNotes/${id}`,{
        method:"PUT",
        headers:{
            "Content-type":"application/json",
         "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4M2E2MDJjMTJkNjQ1ZTdkNzA3OTU1IiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTY2OTU3MjE4MX0.NOHq_7EstxgT_ITIlfwPzCYep3p7JgwlxDiMsLrrZf8"
        },
        body:JSON.stringify({id,title,description,tag})
    })
    const data=await response.json();
    console.log(data);
    

    let newNotes=JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
            newNotes[index].title=title
            newNotes[index].description=description
            newNotes[index].tag=tag
            break;
        }
        setNotes(newNotes)
        
    }

}

    return (

        <NoteContext.Provider value={{notes,getNotes,addNotes,deleteNotes,editNotes}}>
           {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;