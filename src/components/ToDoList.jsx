import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ToDoItem from './ToDoItem.jsx'


export default function ToDoList({fetchTodos}) {
    const [todos, setTodos] = useState([]);
    const [tab, setTab] = useState('active');
    const [error, setError] = useState('');

    const getTodos = useCallback(async function getTodos() {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL+'/todos');
            setTodos(response.data.records);
        } catch (error) {
            setError(error?.response?.data?.message || 'Problem in fetching data')
        }
    }, []); 

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    useEffect(() => {
        if (fetchTodos) {
            getTodos();
        }
    }, [fetchTodos]);

    function handleTab(tab) {
        setTab(tab);
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">All Todos</h2>
            <ul className="flex">
                <li>
                    <button onClick={() => handleTab('active')} className={`px-6 py-4 ${tab === 'active' ? 'bg-gray-300' : ''}`}>Active</button>
                </li>
                <li>
                    <button onClick={() => handleTab('deleted')} className={`px-6 py-4 ${tab === 'deleted' ? 'bg-gray-300' : ''}`}>Deleted</button>
                </li>
            </ul>

            {error && <div className="font-bold text-red-400">{error}</div>}
            {todos.map((element, index) => {
                if (tab === 'active' && !element.deleted_at) {
                    return <ToDoItem key={index} element={element} getTodos={getTodos} />
                }
                if (tab === 'deleted' && element.deleted_at) {
                    return <ToDoItem key={index} element={element} getTodos={getTodos} />
                }
            })}
        </>
    );
}