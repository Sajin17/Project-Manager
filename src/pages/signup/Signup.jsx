import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import './Signup.css'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [password, setPassword] = useState('')
    const [thumbnail, setThumbnail] = useState(null) 
    const [thumbnailError, setThumbnailError] = useState(null)
    const { signup, error, isPending } = useSignup()

    const handleSubmit = (event) => {
      event.preventDefault()
      signup(email, password, displayName, thumbnail)
    }

    const handleFileChange = (event) => {
      setThumbnail(null)
      let selected = event.target.files[0]
      
     if (!selected){
      setThumbnailError('Please select a file!')
      return
     }

      if (!selected.type.includes('image')){
        setThumbnailError('File chosen must be an image!')
        return
      }

      if (selected.size > 100000){
        setThumbnailError('File chosen cannot exceed 100 Kb!')
        return
      }

      setThumbnailError(null)
      setThumbnail(selected)
    }

    return ( 
     <form onSubmit={handleSubmit} className="auth-form">
      <label>
       <span>Email:</span>
       <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
       />  
      </label>
      <label>
       <span>Password</span>
       <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
       />  
      </label>
      <label>
       <span>Display name:</span>
       <input
        type="text"
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
        required
       />  
      </label>
      <label>
       <span>Profile thumbnail:</span>
       <input
        type="file"
        onChange={handleFileChange}
        required
       />  
       {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {isPending && <button className="btn" disabled>Signing up...</button>}
      {!isPending && <button className="btn">Sign up</button>}
      {error && <div className="error">{error}</div>}
     </form>
     );
}
 
export default Signup;