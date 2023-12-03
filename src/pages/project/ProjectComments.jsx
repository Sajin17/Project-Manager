import './Project.css'
import { useState } from 'react'
import { timeStamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../../components/Avatar'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProjectComments = ({ project }) => {
   const { user } = useAuthContext()
   const {updateDocument, response} = useFirestore('projects')
   const [newComments, setNewComments] = useState('')

   const handleSubmit = async (event) => {
    event.preventDefault()

    const commentToadd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComments,
      createdAt: timeStamp.fromDate(new Date()),
      id: Math.random()*100
    }
    await updateDocument(
      project.id,  
      {comments: [...project.comments,commentToadd ]}
    )

    if (!response.error){
      setNewComments('')  
    }
   }

   return ( 
    <div className="project-comments">
     <h4>Project Comments</h4>

     <ul>
     {project.comments.length > 0 && project.comments.map(comment => (
        <li key={comment.id}>
         <div className="comment-author">
          <Avatar src={comment.photoURL}/>
          <p>{comment.displayName}</p>
         </div>   
         <div className="comment-date">
          <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>  
         </div>
         <div className="comment-content">
          <p>{comment.content}</p>  
         </div>
        </li>
     ))}   
     </ul>

     <form onSubmit={handleSubmit} className="add-comment">
      <span>Add new comments:</span>
      <textarea
       onChange={(e) => setNewComments(e.target.value)}
       value={newComments}
       required
       />
      <button className="btn">Add comment</button> 
     </form>   
    </div>
    );
}
 
export default ProjectComments;