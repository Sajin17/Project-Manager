import './App.css'
import { useAuthContext } from './hooks/useAuthContext'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Create from './pages/create/Create'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import UserList from './components/Userlist'

const App = () => {
  const { user, authIsReady } = useAuthContext()

  return ( 
    <div className="App">
      {authIsReady && <BrowserRouter>
       {user && <Sidebar />}
       <div className="container">
        <Navbar />
        <Routes>
          <Route 
           path = "/"
           element = {user ? <Dashboard /> : <Navigate to = "/login" /> }
          />
          <Route 
           path = "/create"
           element = {user ? <Create /> : <Navigate to = "/login" />}
          /> 
          <Route 
           path = "/projects/:id"
           element = {user ? <Project /> : <Navigate to = "login" />}
          /> 
          <Route 
           path = "/login"
           element = {user ? <Navigate to = "/" /> : <Login />}
          /> 
          <Route
           path = "/signup"
           element = {user ? <Navigate to = "/" /> : <Signup />}
          /> 
        </Routes>
       </div>
       {user && <UserList />}
      </BrowserRouter>}
    </div>
   );
}
 
export default App;

