import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Dashboard(){

 const navigate = useNavigate()

 useEffect(()=>{
   if(!auth.currentUser){
     navigate("/")
   }
 },[])

 return(
 <div style={{padding:40}}>

   <h2>Recruiter Dashboard</h2>

   <button onClick={()=>navigate("/create-job")}>
     Create Hiring Link
   </button>

 </div>
 )
}