import axios from "axios";
import Swal from "sweetalert2";
export default function ToDoItem({ element, getTodos }) {
    const deleteIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
    const checkIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
    function handleDelete() {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await axios.delete('http://localhost:8000/api/todos/'+element.id);
                    if (response.status === 200) {
                        getTodos();
                        Swal.fire({
                            title: "Deleted!",
                            text: response?.data?.message || "Record deleted!",
                            icon: "success"
                        });
                    }
                }
              });
            
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.response?.data?.message || "Something went wrong!"
            });
        }
    }

    async function handleStatus() {
        try {
            const response = await axios.post('http://localhost:8000/api/change-status/'+element.id);
            if (response.status === 200) {
                getTodos();
                Swal.fire({
                    title: "Updated!",
                    text: response?.data?.message || "Status Updated!",
                    icon: "success"
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.response?.data?.message || "Something went wrong!"
            });
        }
    }
    return <div className="bg-white shadow-md rounded-lg p-6 mb-12">
        <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-800">{element.title}</h4>
            <p className={`text-sm font-medium ${element.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                {element.status}
            </p>
        </div>
        <div className="flex justify-between items-center">
            <p className="text-gray-600 mb-4">{element.description}</p>
            <div className="flex">

                {/* delete icon */}
                <button onClick={handleDelete} className="text-red-400">
                    {deleteIcon}
                </button>


                {/* check icon */}
                {!element.deleted_at && <button onClick={handleStatus} className="text-green-400">
                    {checkIcon}
                </button>}
            </div>
        </div>
        <small className="text-gray-400">{element.due_date}</small>
    </div>;
}