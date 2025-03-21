import axios from "axios";

const API_URL = 'http://localhost:5000/tasks';

const API_URL_RES = 'http://localhost:5000/register';


//api call to insert new task 
export const addNewTask = async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      return response; // Return the successful response
    } catch (error) {
      if (error.response) {
        // Return the error message from the server
        return { error: error.response.data.message };
      } else if (error.request) {
        // Handle no response from server
        return { error: "No response from the server." };
      } else {
        // Handle other errors
        return { error: "An unexpected error occurred." };
      }
    }
  };
//api call to get all task details 
export const getTaskDetails = async () => {
    try {
        return await axios.get(API_URL);
    }
    catch (error) {
        console.log("Error while getting task details", error.message)
    }
}

//get task using taskiid
export const getTaskId = async (data) => {
    try {
        return await axios.get(`${API_URL}/${data}`);
    }
    catch (error) {
        console.log("Error while getting taskdetails", error.message)
    }
}

//update task
export const updateTask = async (data, id) => {
    if (!id) {
        console.error("Error: ID is undefined!");
        return;
    }
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        console.log("Update Response:", response.data);
        return response;
    } catch (error) {
        console.error("Error while updating task:", error);
    }
};


//delete task using taskiid
export const deleteTask = async (id) => {
  console.log("id", id)
    try {
        return await axios.delete(`${API_URL}/${id}`);
    }
    catch (error) {
        console.log("Error while delete Task", error.message)
    }
}

//Register User
export const registerUser = async (data) => {
    try {
      const response = await axios.post(API_URL_RES, data);
      return response; // Return the successful response
    } catch (error) {
      if (error.response) {
        // Return the error message from the server
        return { error: error.response.data.message };
      } else if (error.request) {
        // Handle no response from server
        return { error: "No response from the server." };
      } else {
        // Handle other errors
        return { error: "An unexpected error occurred." };
      }
    }
  };
