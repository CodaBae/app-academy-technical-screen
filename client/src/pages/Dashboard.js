import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
  
function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
 
    useEffect(()=>{
        if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
            navigate("/");
        }else {
            getUser()
        }
    },[])
 
    const getUser = () => {
        axios.get('/auth/user', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((r) => {
           setUser(r.data)
        })
        .catch((e) => {
            console.log(e)
        });
    }
 
   
    return (
        <Layout>
           <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Dashboard</a>
                            
                        </div>
                    </nav>
                    <h2 className="text-center mt-5">Welcome, {user.name}!</h2  >
                </div>
            </div>
        </Layout>
    );
}
   
export default Dashboard;