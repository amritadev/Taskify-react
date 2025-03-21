import React, { Fragment, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getTaskDetails, deleteTask } from '../service/api';
import swal from 'sweetalert';
import Checkauth from './Checkauth';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Home() {
    const [taskdata, setTaskdata] = useState([]);
    const [filteredData, setFilteredData] = useState([]);  // Filtered data
    const [selectStatus, setSelectstatus] = useState("");
    const [userRole, setUserRole] = useState("")
    const navigateURl = useNavigate();

    Checkauth();

    //Display user details 
    const displayTaskDetails = async () => {
        let response = await getTaskDetails();
        setTaskdata(response.data)
        setFilteredData(response.data)
    }

    const deleteTaskbyID = async (id) => {
        swal({
            title: "Are you sure?",
            text: "You want to delete this Task.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    await deleteTask(id); // Call your API or delete function
                    swal("Deleted!", "Your item has been deleted.", "success");
                    displayTaskDetails();
                } catch (error) {
                    swal("Error!", "Something went wrong while deleting.", "error");
                }
            } else {
                swal("Cancelled", "Your item is safe.", "info");
            }
        });
    };

    const handleStatus = (event) => {
        const keyword = event.target.value;
        setSelectstatus(keyword);

        if (keyword === "Select Status") {
            setTaskdata(filteredData);  // Reset to original data
        } else {
            const filteredResult = filteredData.filter((item) => item.status.includes(keyword));
            console.log("Filtered Data:", filteredResult);
            setTaskdata(filteredResult);
        }
    };

    const handLogout = () => {
        axios.get('http://localhost:5000/logout')
            .then(res => {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                navigateURl('/')
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        displayTaskDetails();

        setUserRole(localStorage.getItem('role'))

    }, [])

    return (
        <Fragment>
            <div className="container mt-3">
                <div className="text-center">
                    <h2 className="text-center">Task List
                    </h2>
                </div>

                <div className="d-flex justify-content-between">
                    <select className="form-select w-25" name="priority" onChange={handleStatus} value={selectStatus}>
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button onClick={handLogout} className="btn btn-danger">Logout</button>
                </div>

                <table class="table table-striped table-bordered mt-5">
                    <thead class="table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskdata && taskdata.length > 0
                            ? taskdata.map((task) => (
                                <tr>
                                    <td> {task.title}</td>
                                    <td> {task.description}</td>
                                    <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                                    <td> {task.priority}</td>
                                    <td> {task.status}</td>
                                    <td>
                                        <div className="mb-3">
                                            {userRole === "admin" ? (
                                                <Link style={{ color: "white" }} to={`/edit/${task.taskid}`}>
                                                    <button className="btn btn-primary">  Update
                                                    </button></Link>

                                            ) : (
                                                <></>
                                            )}
                                            &nbsp;
                                            <button type="button" onClick={() => deleteTaskbyID(task.taskid)} className="btn btn-primary">
                                                DELETE</button>
                                        </div>
                                    </td>
                                </tr>

                            )) : "No Data to display"
                        }
                    </tbody>
                </table>
                <br></br>
                <Link className="d-grid gap-2" to="/addtask">
                    <Button size="lg">Add New Task</Button>
                </Link>
            </div>
        </Fragment>
    )
}
