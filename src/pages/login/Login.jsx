import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin'
import './Login.css'

const Login = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const { login, isPending, error } = useLogin()

  const handleSubmit = (event) => {
    event.preventDefault()
    login(email, password)
  }
 
    return ( 
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>
       <span>Email:</span>
       <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
       />
      </label>
      <label>
        <span>Password:</span>
        <input
         type="password"
         onChange={(e) => setPassword(e.target.value)}
         value={password}
        />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Logging in...</button>}
      {error && <div className='error'>{error}</div>}
    </form>
     );
}
 
export default Login;