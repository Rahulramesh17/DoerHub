import styles from './TaskList.module.css';
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
export default function TaskList({todos,deletetask,edittask,togglecomplete}) {
 
  return (
    <>
    { todos.map(todo=>(
    <div key={todo.id} className={styles.list_container}>
      <div className={styles.task_div}>
        <input type='checkbox' checked={todo.completed} onChange={()=>togglecomplete(todo.id)}></input>
        <h2 className={todo.completed && styles.completed}>{todo.text}</h2>
      </div>
      <div className={styles.icon_div}>
       <IoMdTrash size={34} onClick={() => deletetask(todo.id)} />
<MdEdit size={34} onClick={() => edittask(todo.id)} />

      </div>
    </div>
   )) }
    </>
  )
}
