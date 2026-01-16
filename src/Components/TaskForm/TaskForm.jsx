import { useEffect, useState } from 'react';
import styles from './TaskForm.module.css';
export default function TaskForm({settodos,task,seteditindex,editindex,setfilter,filter}) {
    const[todo, settodo] = useState({text:"",completed:false});

          useEffect(()=> {
                if(editindex != null) {
                    settodo(task);
                }
        },[task,editindex]);
    


    const addtask = () => {
        // console.log(todo);
        if (editindex == null) {
            settodos(prev => [...prev,{
                id:Date.now(),
                text:todo.text,
                completed:false
            }]);
        } else {
            settodos(prev => prev.map(item => 
                item.id===editindex ? {...todo,id:editindex} : item 
            ));
            seteditindex(null);
            }
        settodo({text:"",completed:false});
    };
  return (
    <div className={styles.form_container}>
        <div className={styles.header}>
                <h1>Doer Hub</h1>
                <p>Build for Doers, not Dreamers</p>
        </div>
        <div className={styles.form_btn}>
        <div className={styles.add_btn}>
            <button onClick={addtask}>
              {editindex == null ? "Add Task":"Update"}
                </button>
        </div>
        <div className={styles.input}>
            <input type='text' placeholder='Enter task...' value={todo.text}  onChange={(e)=>settodo(prev=>({...prev,text:e.target.value}))}></input>
        </div>
        <div className={styles.drop_down} >
            <select value={filter} onChange={(e)=>setfilter(e.target.value)}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
            </select>
        </div>
        </div>
    </div>
  )
}
