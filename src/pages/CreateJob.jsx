import { useState } from "react"
import { db, auth } from "../firebase"
import { ref, push } from "firebase/database"
import { useNavigate } from "react-router-dom"

export default function CreateJob(){

 const navigate = useNavigate()

 const [title,setTitle] = useState("")
 const [jd,setJd] = useState("")
 const [mcqs,setMcqs] = useState([
  {q:"",a:""},
  {q:"",a:""},
  {q:"",a:""},
  {q:"",a:""},
  {q:"",a:""}
 ])

 const createJob = async()=>{

  if(!title || !jd){
    alert("Fill job details")
    return
  }

  const job = {
    recruiter: auth.currentUser.uid,
    title,
    jd,
    mcqs
  }

  const jobRef = await push(ref(db,"jobs"),job)

  alert("Hiring Link:\nhttp://localhost:5173/apply/"+jobRef.key)

  navigate("/dashboard")
 }

 return(
 <div style={{padding:40,maxWidth:600,margin:"auto"}}>

 <h2>Create Hiring Link</h2>

 <input placeholder="Job Title"
  onChange={e=>setTitle(e.target.value)}
  style={{width:"100%",padding:10}}/>

 <br/><br/>

 <textarea placeholder="Job Description"
  onChange={e=>setJd(e.target.value)}
  style={{width:"100%",padding:10}}/>

 <br/><br/>

 {mcqs.map((m,i)=>(
  <div key={i}>

   <input placeholder={`Question ${i+1}`}
    onChange={e=>{
     let x=[...mcqs]
     x[i].q=e.target.value
     setMcqs(x)
    }}/>

   <input placeholder="Correct Answer"
    onChange={e=>{
     let x=[...mcqs]
     x[i].a=e.target.value
     setMcqs(x)
    }}/>

   <br/><br/>
  </div>
 ))}

 <button onClick={createJob}>Generate Link</button>

 </div>
 )
}