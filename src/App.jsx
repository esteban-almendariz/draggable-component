import { useState, useEffect } from 'react'
import CreateTask from './components/CreateTask'
import ListTasks from './components/ListTasks'
import toast, { Toaster } from 'react-hot-toast';


function App() {
  const [tasks, setTasks] = useState([])

  console.log('Tasks from App: ', tasks)

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem('tasks')))
  }, [])

  return (
    <>
      <Toaster />
      <div className='bg-slate-100 w-screen h-screen flex flex-col items-center pt-3 gap-16 pt-32'>
        <CreateTask tasks={tasks} setTasks={setTasks}/>
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </>
  )
}

export default App
