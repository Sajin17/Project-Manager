import './UserList.css'
import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar'

const UserList = () => {
  const { documents, error } = useCollection('users')

  return ( 
   <div className="user-list">
    <h2>Users</h2>
    {error && <div>{error}</div>}
    {documents && documents.map(user => (
        <div key={user.id} className="user-list-item">
          {user.online && <span className="online-users"></span>}
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} />
        </div>
      ))}
   </div>  
  );
}
 
export default UserList;