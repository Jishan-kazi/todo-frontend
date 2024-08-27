// import './assets/output.css';
import { useState } from 'react'
import ToDoForm from './components/ToDoForm.jsx'
import ToDoList from './components/ToDoList.jsx'

function App() {
  const [fetchTodos, setFetchTodos] = useState(false);
  function changeFetchTodos(value) {
    setFetchTodos(value);
  }
  console.log('fetchTodos', fetchTodos);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg my-16">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">To Do App{fetchTodos}</h1>
        <ToDoForm changeFetchTodos={changeFetchTodos} />
      </div>
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg mb-16">
        <ToDoList fetchTodos={fetchTodos} />
      </div>
    </div>
  )
}

export default App
