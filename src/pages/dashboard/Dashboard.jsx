import './Dashboard.css'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

const Dashboard = () => {
  const {documents, error} = useCollection('projects')
  const [currentFilter, setCurrentFilter] = useState('All')
  const { user } = useAuthContext()

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter)
  }

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const projects = documents ? documents.filter(document => {
    switch(currentFilter){
      case 'All':
        return true;
      
      case "Mine":
        let assignedToMe = false
        document.assignedUsersList.forEach((u) => {
          if (user.uid === u.id){
            assignedToMe = true
          }
      })
      return assignedToMe;
        
      case "Design":
      case "Development":
      case "Marketing":
      case "Sales":
        console.log(document.category, currentFilter)
        return capitalizeFirstLetter(document.category) === currentFilter

      default:
        return true
    }  
      }) : null

  return ( 
    <div>
     <h2 className="page-title">Dashboard</h2>
     {error && <p>{error}</p>}
     {documents && <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}/>}
     {projects && <ProjectList projects={projects}/>  }
    </div>
  );
}
 
export default Dashboard;