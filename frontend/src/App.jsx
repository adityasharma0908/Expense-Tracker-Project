import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Profilepage from "./pages/Profilepage"
import ProtectedRoute from "./components/ProtectedRoute"

import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (

    <BrowserRouter>

      <Routes>
        

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profilepage />
    </ProtectedRoute>
  }
/>
      
      </Routes>

    </BrowserRouter>

  )
}

export default App