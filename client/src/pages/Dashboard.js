import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

function Dashboard() {
    const navigate = useNavigate();
    const [task, setTask] = useState([])
    const [newTask, setNewTask] = useState([])
    const [update, setUpdate] = useState(true)
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const token = localStorage.getItem('token')

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    useEffect(() => {
        if (localStorage.getItem('token') == "" || localStorage.getItem('token') == null) {
            navigate("/");
        } else {
            getTask()
        }
    },[update])

    const getTask = () => {
        axios.get('/tasks', config)
            .then((task) => {
                setTask(task.data)
            })
            .catch((e) => {
                console.log(e)
            });
    }

    const taskPostAction = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            title: newTask,
        }

        axios.post(`/tasks`, payload, config)
            .then((r) => {
                setIsSubmitting(false)
                if (r.data.UserId) {
                    setNewTask('')
                    setUpdate(!update)
                }
            })
            .catch((e) => {
                setIsSubmitting(false)
                if (e.response.data.errors != undefined) {
                    setValidationErrors(e.response.data.errors);
                }
                if (e.response.data.error != undefined) {
                    setValidationErrors(e.response.data.error);
                }
            });
    }

    const updateTask = async (task, id) => {
        let data = await axios.put(`tasks/${id}`, task, config)
        setUpdate(!update)
    }

    const deleteTask = async (id) => {
        let data = await axios.delete(`tasks/${id}`, config)
        setUpdate(!update)
    }


    return (
        <Layout>
            <div className="row justify-content-md-center mt-5 center">
                <div className="col-xs-6 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Task App</h5>
                            <form onSubmit={(e) => { taskPostAction(e) }}>

                                <div className="mb-3">
                                    <label
                                        htmlFor="task"
                                        className="form-label">Enter Task
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="task"
                                        name="task"
                                        value={newTask}
                                        onChange={(e) => { setNewTask(e.target.value) }}
                                    />


                                </div>


                                <div className="d-grid gap-2">
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary btn-block">+
                                    </button>

                                </div>
                            </form>
                        </div>
                        <div className="card-body display_space">
                            {task.length > 0 ? task.map((item, index) => (
                                <div key={index} className=" display-space">
                                    <div>
                                       <div contentEditable="true" type='text' onBlur={(e) => {
                                            updateTask({ title: e.currentTarget.textContent }, item.id)
                                        }}>
                                            {item.title} 
                                    </div>
                                    </div>
                                    <div className='display-space'>
                                        <input type='checkbox' checked={item.completed} className='check' onChange={() => {
                                            updateTask({ completed: !item.completed }, item.id)
                                        }} />
                                        

                                        <p className='red-text' onClick={() => {
                                            deleteTask(item.id)
                                        }}>Delete</p>
                                    </div>
                                </div>
                            )) : null}

                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;