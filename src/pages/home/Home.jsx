import React, {useEffect, useState} from 'react';
import axiosInstance from "../../axiosConfig/axiosConfig.js";
import swal from "sweetalert2";
import AddTodoModal from "../../components/addTodoModal/AddTodoModal.jsx";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [todoId, setTodoId] = useState('');
    const [editOrAdd, setEditOrAdd] = useState('');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    const priorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red';
            case 'medium': return 'text-primeGreen';
            default: return 'text-primBlack';
        }
    }

    const fetchAllTodos = async () => {
        try {
            const res = await axiosInstance.get(`/users/${token}/todos`, {
                headers: {
                    token: token
                }
            });
            setTodos(res.data.filter(todo => todo?.status === 'to-do'));
            setInProgress(res.data.filter(todo => todo?.status === 'in progress'));
            setDone(res.data.filter(todo => todo?.status === 'done'));
        } catch (err) {
            swal.fire({
                title: 'Error',
                text: err.response.data.error,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axiosInstance.delete(`/todos/${id}`, {
                headers: {
                    token: token
                }
            });
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Task deleted successfully',
            });
            fetchAllTodos(); // Fetch todos after deletion
        } catch (err) {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response.data.error,
            });
        }
    };

    useEffect(() => {
        fetchAllTodos();
    }, [showModal]);

    return (
        <section className="pt-28 px-4 animation h-screen flex flex-col">
            {showModal && (
                <div className={`self-center justify-self-center flex justify-center items-center`}>
                    <AddTodoModal
                        id={todoId}
                        addOrEdit={editOrAdd}
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                </div>
            )}
            <h1 className="text-4xl md:text-6xl text-center textAnimation">Your To-dos</h1>
            <button
                className="flex w-fit items-center gap-2 bg-PrimePurple text-PrimSilver py-3 px-5 rounded-xl my-5 text-xl"
                onClick={() => {
                    setEditOrAdd('add');
                    setTodoId('');
                    setShowModal(true);
                }}
            >
                <i className="material-icons">add_circle</i>
                Add new Task
            </button>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-4/6">
                <div id="to-do"
                     className="border rounded-xl p-2 flex flex-col items-start min-h-3 max-h-full overflow-y-auto">
                    <h1 className={`text-3xl mb-5 text-center self-center text-primeBlue`}>To-Do tasks</h1>
                    <div className="flex flex-col gap-3 w-full">
                        {todos.length > 0 ? todos.map((todo, index) => (
                            <div key={index}
                                 className="bg-primeBlue border rounded-xl p-2 w-full flex flex-col sm:flex-row gap-y-2 sm:gap-0 md:items-center justify-between">
                                <div className="text-primBlack">
                                    <p className={`mb-2 sm:m-0 text-xl font-[400]`}>{todo?.title}</p>
                                    <span className="flex items-center justify-start w-fit gap-2 text-lg">
                                        <i className="material-icons">schedule</i>
                                        {todo?.createdAt}
                                    </span>
                                    <span className={`flex items-center justify-start gap-2`}>
                                        <p className={`text-lg`}>Priority : </p>
                                        <p className={`text-xl font-semibold ${priorityColor(todo?.priority)}`}>{todo?.priority}</p>
                                    </span>
                                </div>
                                <span className="flex items-center gap-3">
                                    <i
                                        className="cursor-pointer material-icons text-primBlack"
                                        onClick={() => {
                                            setTodoId(todo?._id);
                                            setEditOrAdd('edit');
                                            setShowModal(true);
                                        }}
                                    >
                                        create
                                    </i>
                                    <i onClick={() => {
                                        swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            allowOutsideClick: false,
                                            showCancelButton: true,
                                            confirmButtonColor: "#e55952",
                                            cancelButtonColor: "#90ee90",
                                            confirmButtonText: "Yes, delete it!",
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                deleteTodo(todo._id)
                                                swal.fire({
                                                    title: "Deleted!",
                                                    text: "Your file has been deleted.",
                                                    icon: "success"
                                                });
                                            }
                                        });
                                    }} className="cursor-pointer material-icons text-primeRed">delete_sweep</i>
                                </span>
                            </div>
                        )) : (
                            <div className="border rounded-xl p-2 bg-primeBlue text-primBlack">No tasks to do start adding some tasks</div>
                        )}
                    </div>
                </div>
                <div className="border rounded-xl p-2 flex flex-col items-start min-h-3 max-h-full overflow-y-auto"
                     id="in-progress">
                    <h1 className={`text-3xl mb-5 text-center self-center text-primeYellow`}>In-Progress tasks</h1>
                    <div className="flex flex-col gap-3 w-full">
                        {inProgress.length > 0 ? inProgress.map((todo, index) => (
                            <div key={index}
                                 className="bg-primeYellow border rounded-xl p-2 w-full flex flex-col sm:flex-row gap-y-2 sm:gap-0 md:items-center justify-between">
                                <div className="text-darkGoldenrod">
                                    <p className={`mb-2 sm:m-0 text-xl font-[400]`}>{todo?.title}</p>
                                    <span className="flex items-center justify-start w-fit gap-2 text-lg">
                                        <i className="material-icons">schedule</i>
                                        {todo?.createdAt}
                                    </span>
                                    <span className={`flex items-center justify-start gap-2`}>
                                        <p className={`text-lg`}>Priority : </p>
                                        <p className={`text-xl font-semibold ${priorityColor(todo?.priority)}`}>{todo?.priority}</p>
                                    </span>
                                </div>
                                <span className="flex items-center gap-3">
                                    <i
                                        className="cursor-pointer material-icons text-primBlack"
                                        onClick={() => {
                                            setTodoId(todo?._id);
                                            setEditOrAdd('edit');
                                            setShowModal(true);
                                        }}
                                    >
                                        create
                                    </i>
                                    <i onClick={() => {
                                        swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            allowOutsideClick: false,
                                            showCancelButton: true,
                                            confirmButtonColor: "#e55952",
                                            cancelButtonColor: "#90ee90",
                                            confirmButtonText: "Yes, delete it!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                deleteTodo(todo._id)
                                                swal.fire({
                                                    title: "Deleted!",
                                                    text: "Your file has been deleted.",
                                                    icon: "success"
                                                });
                                            }
                                        });
                                    }} className="cursor-pointer material-icons text-primeRed">delete_sweep</i>
                                </span>
                            </div>
                        )) : (
                            <div className="border rounded-xl p-2 bg-primeYellow text-darkGoldenrod">No tasks in
                                progress start adding some tasks</div>
                        )}
                    </div>
                </div>
                <div className="border rounded-xl p-2 flex flex-col items-start min-h-fit max-h-full overflow-y-auto"
                     id="done">
                    <h1 className={`text-3xl mb-5 text-center self-center text-primeGreen`}>Done tasks</h1>
                    <div className="flex flex-col gap-3 w-full">
                        {done.length > 0 ? done.map((todo, index) => (
                            <div key={index}
                                 className="bg-primeGreen border rounded-xl p-2 w-full flex flex-col sm:flex-row gap-y-2 sm:gap-0 md:items-center justify-between">
                                <div className="text-darkGreen">
                                    <p className={`mb-2 sm:m-0 text-xl font-[400]`}>{todo?.title}</p>
                                    <span className="flex items-center justify-start w-fit gap-2 text-lg">
                                        <i className="material-icons">schedule</i>
                                        {todo?.createdAt}
                                    </span>
                                    <span className={`flex items-center justify-start gap-2`}>
                                        <p className={`text-lg`}>Priority : </p>
                                        <p className={`text-xl font-semibold ${priorityColor(todo?.priority)}`}>{todo?.priority}</p>
                                    </span>
                                </div>
                                <span className="flex items-center gap-3">
                                    <i
                                        className="cursor-pointer material-icons text-primBlack"
                                        onClick={() => {
                                            setTodoId(todo?._id);
                                            setEditOrAdd('edit');
                                            setShowModal(true);
                                        }}
                                    >
                                        create
                                    </i>
                                    <i onClick={() => {
                                        swal.fire({
                                            title: "Are you sure?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            allowOutsideClick: false,
                                            showCancelButton: true,
                                            confirmButtonColor: "#e55952",
                                            cancelButtonColor: "#90ee90",
                                            confirmButtonText: "Yes, delete it!"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                deleteTodo(todo._id)
                                                swal.fire({
                                                    title: "Deleted!",
                                                    text: "Your file has been deleted.",
                                                    icon: "success"
                                                });
                                            }
                                        });
                                    }} className="cursor-pointer material-icons text-primeRed">delete_sweep</i>
                                </span>
                            </div>
                        )) : (
                            <div className="border rounded-xl p-2 bg-primeGreen text-darkGreen">No tasks done start adding some</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
