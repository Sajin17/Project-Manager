import './Dashboard.css'

const filterList = ["All", "Mine", "Design", "Development", "Sales", "Marketing"]

const ProjectFilter = ({ currentFilter, changeFilter }) => {
   const handleClick = (newFilter) => {
      changeFilter(newFilter)
   }

   return ( 
    <div className="project-filter">
     <nav>
      <p>Filter by:</p>
      {filterList.map((f) => (
       <button
        key={f}
        onClick={() => handleClick(f)}
        className={currentFilter === f ? 'active' : ''}
       >{f}</button> 
      ))}
     </nav>   
    </div>
   );
}
 
export default ProjectFilter;