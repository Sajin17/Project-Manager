import './Navbar.css'
import Screen from '../assets/reshot-icon-screen-9M3SDKFZCN.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout, isPending } = useLogout()  
  const { user } = useAuthContext()

  return ( 
   <div className="navbar">
    <ul>
     <li className="logo">
      <img src={Screen} alt="Logo" />
      <span>Project Manager</span>  
     </li>
     {!user && (
     <>
     <li><Link to="/login">Login</Link></li>
     <li><Link to="/signup">Signup</Link></li>
     </> 
     )}
     {user && (<li>
    <button className="btn" onClick={logout}>Logout</button>
     </li>)}
    </ul>
   </div> 
  );
}
 
export default Navbar;