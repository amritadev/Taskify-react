import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../service/api";


const initialvalue = {
    username: '',
    email: '',
    password: '',
    role: ''
}

function Register() {
    const [registerdata, setRegisterdata] = useState(initialvalue);
    let history = useNavigate();

    const onChangevalue = (e) => {
        setRegisterdata({ ...registerdata, [e.target.name]: e.target.value })
    }

    const registerNewUser = async (e) => {
        e.preventDefault();
        // Validation checks
        if (registerdata.username.trim() === "") {
            toast.error("Username is required!");
            return;
        } else if (registerdata.email.trim() === "") {
            toast.error("Email is required!");
            return;
        } else if (registerdata.password.trim() === "") {
            toast.error("Password is required!");
            return;
        } else if (registerdata.role.trim() === "") {
            toast.error("Role is required!");
            return;
        }

        try {
            const response = await registerUser(registerdata);
            if (response.data.status === 'Success') {
                toast.success("Registration done successfully");
                history('/')
            }
            if (response.data.error) {
                toast.error("Email is already exist", response.data.error);
            }

        } catch (error) {
            console.log("Error occurred");
        }
    };

    return (
        <div className="container card mt-5 w-50">
            <div className="row card-header">
                <div className="col-md-12  text-center">
                    <h2 className="text-center">Create Account</h2>
                </div>
            </div>

            <form className="mt-2">
                <div className="container mb-3">
                    <label className="form-label">Username:</label>
                    <input type="text" placeholder="Enter username" name="username" className="form-control" onChange={(e) => onChangevalue(e)} />
                </div>
                <div className="container mb-3">
                    <label className="form-label">Email:</label>
                    <input type="text" placeholder="Enter email" name="email" className="form-control" onChange={(e) => onChangevalue(e)} />
                </div>

                <div className="container mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" placeholder="Enter password" name="password"
                        className="form-control" onChange={(e) => onChangevalue(e)} />
                </div>
                <div className="container mb-3">
                    <label><stro>Role</stro></label>
                    <select className="form-select" name="role" onChange={(e) => onChangevalue(e)} >
                        <option selected>Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>

                <div className="mb-3">
                    <button onClick={(e) => registerNewUser(e)} className="btn btn-primary w-100 rounded-0">Register</button>
                </div>
            </form>
            <ToastContainer />

        </div>
    )
}

export default Register
