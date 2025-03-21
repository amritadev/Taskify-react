import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Addtask from "./components/Addtask";
import Edittask from "./components/Edittask";
import Login from "./components/login/login";
import Register from "./components/login/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Routes>
      <Route path ='/' element= {<Login/>} />
      <Route path ='/home' element= {<Home/>} />
      <Route path ='/addtask' element= {<Addtask/>} />
      <Route path='/edit/:id'  element= {<Edittask/>} />
      <Route path='/register'  element= {<Register/>} />
     </Routes>
     </BrowserRouter>   
    </div>
  );
}

export default App;
