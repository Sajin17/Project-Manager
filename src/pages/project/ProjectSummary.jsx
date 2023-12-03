import './Project.css'
import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom'

const ProjectSummary = ({ project }) => {
  const { user } = useAuthContext()
  const { deleteDocument } = useFirestore('projects')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    deleteDocument(project.id)
    navigate('/')
  }

  return ( 
   <div>
    <div className="project-summary">
     <h2 className="project-title">{project.name}</h2>
     <p>By {project.createdBy.displayName}</p>
      <p className="deadline">
       Project deadline: {project.deadline.toDate().toDateString()}
      </p>  
      <p className="details">{project.details}</p>  
      <div className="assigned-users">
       {project.assignedUsersList.map(user => (
        <div key = {user.id}>
           <Avatar src={user.photoURL}/>   
        </div>
       ))} 
      </div>
    </div>
    {user.uid === project.createdBy.id &&(
    <button className="btn" onClick={handleSubmit}>Mark as done</button>
    )}
   </div> 
   );
}
 
export default ProjectSummary;