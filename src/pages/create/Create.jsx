import { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { timeStamp } from '../../firebase/config';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import './Create.css';

const categories = [
  {value: "design", label: "Design"},
  {value: "development", label: "Development"},
  {value: "sales", label: "Sales"},
  {value: "marketing", label: "Marketing"}
]

const Create = () => {
  const navigate = useNavigate()
  const {addDocument, response} = useFirestore('projects')
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [deadline, setDeadline] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents){
      const options = documents.map(user => {
        return {value: user, label: user.displayName}
      })
    
    setUsers(options)  

    }
  }, [documents])


  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError(null)

    if (!category){
      setFormError('Please select a project category!')
      return
    }
    if (assignedUsers.length < 1){
      setFormError('Please assign at least one user to the project!')
      return
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }
  
    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
    })
  
    const project = {
      name,
      details,
      createdBy,
      assignedUsersList,
      category: category.value,
      deadline: timeStamp.fromDate(new Date(deadline)),
      comments: []
    }

    await addDocument(project)
    if (!response.error) {
      navigate('/')
    }
  }

  return ( 
   <div className="create-form">
    <form onSubmit={handleSubmit}>
      <label>
       <span>Project name:</span>
       <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
       />  
      </label>
      <label>
       <span>Project details:</span>
       <textarea
        onChange={(e) => setDetails(e.target.value)}
        value={details}
        placeholder="The project is..."
        required
       />  
      </label>
      <label>
       <span>Set deadline:</span>
       <input
        type="date"
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
        required
       />  
      </label>
      <label>
       <span>Project category:</span>
       <Select 
        options={categories}
        onChange={(option) => setCategory(option)}
       />
      </label>
      <label>
       <span>Assign to:</span>
       <Select 
        options={users}
        onChange={(option) => setAssignedUsers(option)}
        isMulti
       /> 
      </label>
      <button className="btn">Add project</button>
      {formError && <p className="error">{formError}</p>}
    </form>
   </div>       
  );
}
 
export default Create;
