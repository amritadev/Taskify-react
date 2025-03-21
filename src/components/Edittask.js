import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams, Link } from "react-router-dom";
import { updateTask, getTaskId } from "../service/api";
import Checkauth from './Checkauth';

const initialvalue = {
    title: '',
    description: '',
    dueDate: '',
    status: '',
    priority: '',
}
function Edittask() {

    const { id } = useParams();
    const [taskdata, setTaskdata] = useState(initialvalue);

    Checkauth();
   
    const onChangeValue = (e) => {
        setTaskdata({ ...taskdata, [e.target.name]: e.target.value })
    };

    const getTaskDatabyId = async () => {
        try {
            let response = await getTaskId(id);
            console.log("API Response:", response.data); // Debugging step
            setTaskdata(response.data); // Ensure the correct structure
        } catch (error) {
            console.error("Error fetching task data:", error);
        }
    };

    const editTask = async () => {
        
        try {
            const response = await updateTask(taskdata, id);
            console.log("API Response:", response?.data);
            window.location.href = '/home'; 
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    useEffect(() => {
        getTaskDatabyId();
    }, [])
  
    return (
        <div class="container card mt-5 w-50">
            <div class="row card-header">
                <div class="col-md-1   text-center">
                    <Link className="d-grid gap-2" to="/home">
                        <i className="bi bi-house" style={{ fontSize: "1.5rem", color: "blue" }} /></Link>
                </div>
                <div class="col-md-10  text-center">
                    <h2 className="text-center ">Modify Task</h2>
                </div>
            </div>
            <form>
                <div className="container mb-3">
                    <label class="form-label">Title:</label>
                    <input type="text" placeholder="Enter Title" name="title" className="form-control" value={taskdata.title}
                        onChange={ onChangeValue} />
                </div>
                <div class="container mb-3">
                    <label class="form-label">Description:</label>
                    <textarea class="form-control" name="description" onChange={(e) => onChangeValue(e)} rows="4"
                        placeholder="Type your text here..." value ={taskdata.description} ></textarea>
                </div>

                <div class="container mb-3">
                    <label class="form-label">Due Date:</label>
                    {/* <input type="text" placeholder="Enter Title" name="dueDate" 
                    className="form-control" value={taskdata.dueDate}
                        onChange={ onChangeValue} /> */}
                 <input
                        type="date"
                        onChange={(e) => onChangeValue(e)}
                        name="dueDate"
                        className="form-control"
                        value={taskdata?.dueDate ? new Date(taskdata.dueDate).toISOString().split("T")[0] : ""}
                    /> 
                </div>
                <div className="container mb-3">
                    <label ><stro>priority</stro></label>
                    <select class="form-select" value={taskdata.priority} name="priority" onChange={(e) => onChangeValue(e)} >
                        <option selected>Select priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="container mb-3">
                    <label><stro>Status</stro></label>
                    <select class="form-select" value={taskdata.status} name="status" onChange={(e) => onChangeValue(e)} >
                        <option selected>Select status </option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="mb-3">
                    <button  onClick={editTask} className="btn btn-primary w-100 rounded-0">Update</button>
                </div>
            </form>

        </div>
    )
}

export default Edittask;