import { useState } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function Login(){

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")
 const navigate = useNavigate()

 const signup = async()=>{
   try{
     await createUserWithEmailAndPassword(auth,email,password)
     navigate("/dashboard")
   }catch(e){
     alert(e.message)
   }
 }

 const login = async()=>{
   try{
     await signInWithEmailAndPassword(auth,email,password)
     navigate("/dashboard")
   }catch(e){
     alert(e.message)
   }
 }

 return(
 <div style={{display:"flex",justifyContent:"center",marginTop:120}}>

  <div className="card" style={{width:380}}>

    <h2 style={{textAlign:"center"}}>Recruiter Login</h2>

    <input placeholder="Email"
      onChange={e=>setEmail(e.target.value)}/>

    <br/><br/>

    <input type="password"
      placeholder="Password"
      onChange={e=>setPassword(e.target.value)}/>

    <br/><br/>

    <div style={{display:"flex",gap:10}}>
      <button onClick={login} style={{flex:1}}>Login</button>
      <button onClick={signup} style={{flex:1}}>Signup</button>
    </div>

  </div>

 </div>
 )
}