import { useState, useEffect } from "react";
import TaskForm from "./Components/TaskForm/TaskForm";
import TaskList from "./Components/TaskList/TaskList";
import './index.css';
export default function App() {
      const[todos, settodos] = useState([]);
      const[task,settask] = useState({text:"",completed:false});
      const[editindex,seteditindex] = useState(null);
      const[filter,setfilter] = useState("all");
      const [hasLoaded, setHasLoaded] = useState(false);


      const filteredtodos = todos.filter(todo=>{
        if(filter === "completed") return todo.completed
        if(filter === "pending") return !todo.completed
        return true;
      })

 useEffect(() => {
  const savedTodos = localStorage.getItem("todos");

  if (savedTodos) {
    settodos(JSON.parse(savedTodos));
  }

  setHasLoaded(true);
}, []);


useEffect(() => {
  if (!hasLoaded) return; 

  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos, hasLoaded]);

      

const completedCount = todos.filter(todo => todo.completed).length;
const totalCount = todos.length;
const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);



         const deletetask = (id) => {
      settodos(prev  => prev.filter(todo=>todo.id !== id));
  }

  const edittask = (id) => {
    const selected = todos.find(todo=> todo.id == id)
      settask(selected);
      seteditindex(id);
  }

  const togglecomplete = (id) => {
        settodos(prev => prev.map(todo=> 
          todo.id === id ? {...todo,completed:!todo.completed}:todo
        ));
  }

  
  return (
  
    <div className="main_container">
      <div>
     <TaskForm settodos={settodos} 
     task={task}
     setfilter={setfilter}
     filter={filter}
     editindex={editindex}
     seteditindex={seteditindex}
     />
     </div>

     <div className="tasklist">
     <TaskList todos={filteredtodos} deletetask={deletetask} edittask={edittask} togglecomplete={togglecomplete}/>
     </div>

      
<div style={{ margin: "20px 0", width: "500px", marginLeft: "auto", marginRight: "auto" }}>
  <label style={{ fontWeight: 600, marginBottom: "6px", display: "block", textAlign: "center" }}>
    Progress: {progress}%
  </label>
  <progress 
    value={progress} 
    max={100} 
    style={{ width: "100%", height: "12px", borderRadius: "6px" }} 
  />
</div>




    </div>

    
   
  )
}
