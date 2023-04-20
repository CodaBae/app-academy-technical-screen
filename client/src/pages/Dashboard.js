import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

function Dashboard() {
    const navigate = useNavigate();
    const [task, setTask] = useState([])
    const [newTask, setNewTask] = useState([])
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    const token = localStorage.getItem('token')


    useEffect(() => {
        if (localStorage.getItem('token') == "" || localStorage.getItem('token') == null) {
            navigate("/");
        } else {
            getTask()
        }
    })

    const getTask = () => {
        axios.get('/tasks', { headers: { authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then((r) => {
                setTask(r.data)
            })
            .catch((e) => {
                console.log(e)
            });
    }

    const taskAction = (e) => {
        setValidationErrors({})
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            title: newTask,
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.post(`/tasks`, payload, config)
            .then((r) => {
                setIsSubmitting(false)
                if (r.data.UserId) {
                    setNewTask('')
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


    return (
        <Layout>
            <div className="row justify-content-md-center mt-5 center">
                <div className="col-xs-6 col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Task App</h5>
                            <form onSubmit={(e) => { taskAction(e) }}>

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
                            {task.length > 0 ? task.map((item,index)=>(
                               <div key={index} className=" display-space">
                               <div>
                                   <p>{item.title}</p>
                               </div>
                               <div className='display-space'>
                                   <input type='checkbox'  className='check'/>
                                   <p className='red-text'>Delete</p>
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