import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const initialvalue = {
    email: '',
    password: ''
}
export default function Login() {
    const [values, setValues] = useState(initialvalue);

    let navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const onChangeValue = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validation checks
                if (values.email.trim() === "") {
                    toast.error("Email is required!");
                    return;
                } else if (values.password.trim() === "") {
                    toast.error("Password is required!");
                    return;
                } else {
                    try {
                        const res = await axios.post('http://localhost:5000/login', values);
                        const token = res.data.token;
                        const role = res.data.role;
                        localStorage.setItem('token', token);
                        localStorage.setItem('role', role);
                        navigate('/home');
                    } catch (error) {
                        console.error("Login error:", error.response ? error.response.data : error.message);
                    }

                }
        
    };

    return (
        <div className="container card mt-5 w-50">
            <div className="row card-header">
                <div className="col-md-12  text-center">
                    <h2 className="text-center ">Login Page</h2>
                </div>
            </div>
            <form className="mt-2">
                <div className="container mb-3 ">
                    <label class="form-label">Email:</label>
                    <input type="text" placeholder="Enter email" name="email"
                        className="form-control" onChange={(e) => onChangeValue(e)} />
                </div>

                <div className="container mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" placeholder="Enter password" name="password"
                        className="form-control" onChange={(e) => onChangeValue(e)} />
                </div>
            </form>
            <div className="d-flex justify-content-center  mb-3 w-100">
                <button onClick={handleSubmit} className="btn btn-primary ">Login</button>
                <Link to="/register">
                    <button className="btn btn-secondary mx-2">Register</button>
                </Link>
            </div>
            <ToastContainer />
        </div>
    )
}
