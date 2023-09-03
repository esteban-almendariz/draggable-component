import React, {useState} from 'react'
import { v4 as uuidv4} from 'uuid'
import toast, { Toaster } from 'react-hot-toast'

const CreateTask = ({tasks, setTasks}) => {

    const [task, setTask] = useState({
        id: '',
        name: '',
        status: 'todo'
    })

    const createNewTask = (e) => {
        setTask({...tasks, id: uuidv4(), name: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(task.name.length < 3) return toast.error('A task must have more than 3 characters.')
        if(task.name.length > 100) return toast.error('A task must be less than 100 characters.')
       

        setTasks(prevTask => {
            const list = [...prevTask, task]

            localStorage.setItem('tasks', JSON.stringify(list))

            return list
        })

        toast.success("Task Created")

        setTask({
            id: '',
            name: '',
            status: 'todo'
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 2-64 px-1" 
                onChange={createNewTask}
                value={task.name}
            />
            <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">Create</button>
        </form>
    )
}

export default CreateTask