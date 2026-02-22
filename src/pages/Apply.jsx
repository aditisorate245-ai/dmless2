import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import { ref as dbRef, get, push } from "firebase/database"

export default function Apply(){

 const { jobId } = useParams()

 const [job,setJob] = useState(null)
 const [answers,setAnswers] = useState([])
 const [name,setName] = useState("")
 const [email,setEmail] = useState("")
 const [resume,setResume] = useState(null)
 const [qualified,setQualified] = useState(null)
 const [started,setStarted] = useState(false)

 useEffect(()=>{
   get(dbRef(db,"jobs/"+jobId)).then(snap=>{
     setJob(snap.val())
   })
 },[jobId])

 const startTest = ()=>{
  if(!name || !email){
    alert("Enter name and email")
    return
  }
  setStarted(true)
 }

 const submitMCQ = async()=>{

  let pass = true

  job.mcqs.forEach((m,i)=>{
    const user = (answers[i]||"").trim().toLowerCase()
    const correct = (m.a||"").trim().toLowerCase()
    if(user !== correct) pass=false
  })

  setQualified(pass)

  if(!pass){
    await push(dbRef(db,"candidates/"+jobId),{
      name,
      email,
      status:"knocked"
    })
  }
 }

 const uploadResume = async()=>{

  if(!resume){
   alert("Select resume")
   return
  }

  const data = new FormData()
  data.append("file",resume)
  data.append("upload_preset","dmless_resume")

  const res = await fetch(
   "https://api.cloudinary.com/v1_1/dirxdazku/auto/upload",
   { method:"POST", body:data }
  )

  const file = await res.json()

  await push(dbRef(db,"candidates/"+jobId),{
    name,
    email,
    resume:file.secure_url,
    status:"shortlisted"
  })

  alert("Application submitted")
 }

 if(!job) return <h3>Loading...</h3>

 /* ---------------- FIRST SCREEN ---------------- */

 if(!started){
  return(
   <div style={{padding:40,maxWidth:500,margin:"auto"}}>

    <h2>{job.title}</h2>
    <p>{job.jd}</p>

    <input placeholder="Your Name"
      onChange={e=>setName(e.target.value)}/>

    <br/><br/>

    <input placeholder="Your Email"
      onChange={e=>setEmail(e.target.value)}/>

    <br/><br/>

    <button onClick={startTest}>Start Test</button>

   </div>
  )
 }

 /* ---------------- KNOCKED ---------------- */

 if(qualified===false){
   return <h2>Sorry, you are knocked out.</h2>
 }

 /* ---------------- MCQ SCREEN ---------------- */

 return(
 <div style={{padding:40,maxWidth:600,margin:"auto"}}>

 <h2>{job.title}</h2>

 {qualified===null && job.mcqs.map((m,i)=>(
  <div key={i}>
    <p>{m.q}</p>
    <input placeholder="Your Answer"
      onChange={e=>{
        let x=[...answers]
        x[i]=e.target.value
        setAnswers(x)
      }}/>
  </div>
 ))}

 <br/>

 {qualified===null &&
   <button onClick={submitMCQ}>Submit Test</button>
 }

 {qualified===true && (
  <div>

   <h3>You are shortlisted!</h3>

   <input type="file"
     onChange={e=>setResume(e.target.files[0])}/>

   <br/><br/>

   <button onClick={uploadResume}>Upload Resume</button>

  </div>
 )}

 </div>
 )
}