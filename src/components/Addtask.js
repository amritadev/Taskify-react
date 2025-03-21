import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, Link } from "react-router-dom";
import { addNewTask } from "../service/api";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const initialvalue = {
    title: '',
    desc: '',
    date: '',
    status: '',
    priority: '',
}
function Addtask() {

    const [taskdata, setTaskdata] = useState(initialvalue);
    const [error, setError] = useState("");
    let history = useNavigate();

    const onChnageValue = (e) => {
        setTaskdata({ ...taskdata, [e.target.name]: e.target.value })
    }

    const addTaskDetails = async (e) => {
        e.preventDefault();
        if (taskdata.title.trim() === "") {
            toast.error("Title is required!");
            return;  
        } else if (taskdata.desc.trim() === "") {  
            toast.error("Description is required!");
            return;
        } else if (taskdata.date.trim() === "") {  
            toast.error("date is required!");
            return;
        } else if (taskdata.status.trim() === "") { 
            toast.error("status is required!");
            return;
        } else if (taskdata.priority.trim() === "") { 
            toast.error("priority is required!");
            return;
        } else {
            const response = await addNewTask(taskdata)
            setError("Error In adding task", response.data.error); 
            history('/home')
        }
    }

    return (
        <div class="container card mt-5 w-50">
            <div class="row card-header">
                <div class="col-md-1   text-center">
                    <Link className="d-grid gap-2" to="/home">
                        <i className="bi bi-house" style={{ fontSize: "1.5rem", color: "blue" }} /></Link>
                </div>
                <div class="col-md-10  text-center">
                    <h2 className="text-center ">Create New Task</h2>
                </div>
            </div>

            <h2>{error}</h2>
            <form>
                <div className="container mb-3">
                    <label  class="form-label">Title:</label>
                    <input type="text" placeholder="Enter Title" name="title" className="form-control" 
                        onChange={(e) => onChnageValue(e)}  />
                </div>
                <div class="container mb-3">
                    <label  class="form-label">Description:</label>
                    <textarea class="form-control" name="desc" onChange={(e) => onChnageValue(e)} rows="4" placeholder="Type your text here..."></textarea>
                </div>

                <div class="container mb-3">
                    <label class="form-label">Due Date:</label>
                    <input type="date" onChange={(e) => onChnageValue(e)} name="date" class="form-control" />
                </div>
                <div className="container mb-3">
                    <label ><stro>priority</stro></label>
                    <select class="form-select" name="priority" onChange={(e) => onChnageValue(e)}>
                        <option selected>Select priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="container mb-3">
                    <label><stro>Status</stro></label>
                    <select class="form-select" name="status" onChange={(e) => onChnageValue(e)}>
                        <option selected>Select status </option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="mb-3">
                    <button  onClick={(e) => addTaskDetails(e)} className="btn btn-primary w-100 rounded-0">Create</button>
                </div>
            </form>
            <ToastContainer />

        </div>
    )
}

export default Addtask;