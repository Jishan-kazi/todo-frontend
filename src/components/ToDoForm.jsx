import axios from "axios";
import { useState } from "react";

export default function ToDoForm({changeFetchTodos}) {
    const [error, setError] = useState(null);
    const [isAddedSuccessfully, setIsAddedSuccessfully] = useState(false);
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setIsAddedSuccessfully(false);
        changeFetchTodos(false);


        const fd = new FormData(e.target);
        const toDo = Object.fromEntries(fd.entries());
        try {
            await axios.post('http://127.0.0.1:8000/api/todos', toDo);
            e.target.reset();
            setIsAddedSuccessfully(true);
            changeFetchTodos(true);
        } catch (error) {
            setError(error?.response?.data?.message || 'Todo insert failed!');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                    type="text"
                    placeholder="Enter title"
                    id="title"
                    name="title"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                    placeholder="Enter description"
                    id="description"
                    name="description"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="due-date" className="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
                <input
                    type="date"
                    id="due-date"
                    name="due_date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            {error && <div className="text-red-600">{error}</div>}
            {isAddedSuccessfully && <div className="text-green-600">Task Added Successfully</div>}
            <div className="text-right">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add
                </button>
            </div>
        </form>
    );
}
