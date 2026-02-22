import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import CreateJob from "./pages/CreateJob"
import Apply from "./pages/Apply"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-job" element={<CreateJob />} />
      <Route path="/apply/:jobId" element={<Apply />} />
    </Routes>
  )
}