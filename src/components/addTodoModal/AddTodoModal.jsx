import React, {useState, useEffect} from 'react';
import axiosInstance from "../../axiosConfig/axiosConfig.js";
import swal from "sweetalert2";

const AddTodoModal = ({ id, addOrEdit, showModal, setShowModal }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('to-do');
    const [priority, setPriority] = useState('low');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    useEffect(() => {
        if (addOrEdit === 'edit' && id) {
            getTodoById(id);
        }
    }, [id, addOrEdit]);

    const getTodoById = async (id) => {
        try {
            const res = await axiosInstance.get(`/todos/${id}`, {
                headers: {
                    token: token
                }
            });
            const todo = res.data;
            setTitle(todo.title);
            setStatus(todo.status);
            setPriority(todo.priority);
        } catch (err) {
            swal.fire({
                title: 'Error',
                text: 'Error fetching todo',
                icon: 'error',
                confirmButtonText: 'Ok',
            })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const todoData = { title, status, priority };
        try {
            if (addOrEdit === 'edit') {
                try{
                    await axiosInstance.patch(`/todos/${id}`, todoData, {
                        headers: {token: token}
                    });
                    swal.fire({
                        title: 'Success',
                        text: 'Todo updated successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                    })
                }catch (err){
                    swal.fire({
                        title: 'Error',
                        text: 'Error updating todo',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                    })
                }
            } else {
                await axiosInstance.post('/todos', todoData, {
                    headers: { token: token }
                });
            }
            swal.fire({
                title: 'Success',
                text: 'Todo added successfully',
                icon: 'success',
                confirmButtonText: 'Ok',
            })
            setShowModal(false);
        } catch (err) {
            swal.fire({
                title: 'Error',
                text: 'Error adding todo',
                icon: 'error',
                confirmButtonText: 'Ok',
            })
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed top-0 z-50 flex justify-center items-center w-full rounded-lg  !h-screen">
            <div className="relative w-1/2 h-[60%]">
                <div className="relative rounded-lg shadow !backdrop-blur-[50px] border border-PrimSilver">
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t ">
                        <h3 className="text-3xl font-semibold text-primBlack">
                            {addOrEdit === 'edit' ? 'Edit Todo' : 'Add Todo'}
                        </h3>
                    </div>
                        <button onClick={() => setShowModal(false)} className={`absolute top-4 right-4`}>
                            <i className="material-icons !text-4xl !text-red">close</i>
                        </button>
                    <div className="p-4 md:p-5 space-y-4">
                        <form className="text-primBlack text-xl font-[500]" onSubmit={handleSubmit}>
                            <div className="relative border-b-2 border-PrimSilver w-full my-8">
                                <input
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                    className="bg-transparent border-none w-full h-12 !text-[1.2em] pr-10 pl-[5px] focus:outline-none focus:border-none"
                                    required
                                    type="text"
                                    id="title"
                                />
                                <label
                                    className={`absolute top-[50%] left-1.5 text-lg translate-y-[-2.7rem] pointer-events-none text-[1em] transition-all duration-200 ease-in-out`}
                                    htmlFor="title"
                                >
                                    Title
                                </label>
                            </div>
                            <div className="relative border-b-2 border-PrimSilver w-full py-5 my-8">
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="pl-[5px] text-[1.1rem] bg-transparent border-none w-full focus:outline-none focus:border-none"
                                >
                                    <option className="text-lg" value="to-do">To Do</option>
                                    <option className="text-lg" value="in progress">In Progress</option>
                                    <option className="text-lg" value="done">Done</option>
                                </select>
                                <label className="absolute -top-2 left-1.5 text-lg pointer-events-none text-[1em] transition-all duration-200 ease-in-out">
                                    Status
                                </label>
                            </div>
                            <div className="relative border-b-2 border-PrimSilver w-full py-5 my-8">
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="pl-[5px] text-[1.1rem] bg-transparent border-none w-full focus:outline-none focus:border-none"
                                >
                                    <option className="text-lg" value="low">Low</option>
                                    <option className="text-lg" value="medium">Medium</option>
                                    <option className="text-lg" value="high">High</option>
                                </select>
                                <label className="absolute -top-2 left-1.5 text-lg pointer-events-none text-[1em] transition-all duration-200 ease-in-out">
                                    Priority
                                </label>
                            </div>
                            <div className="flex items-center justify-end p-4 md:p-5">
                                <button type="submit" className="px-4 py-2 bg-primeYellow text-darkGoldenrod rounded">
                                    {addOrEdit === 'edit' ? 'Save Changes' : 'Add Todo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTodoModal;
