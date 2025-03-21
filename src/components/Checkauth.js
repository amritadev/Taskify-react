import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Checkauth() {
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);
}

export default Checkauth;
