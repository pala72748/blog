import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../../Components/Layouts/Button';
import axios from 'axios';
import api from '../../api/api';

const User = () => {

  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const [user, setUser] = useState([]);

  const handleClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/login')
  }

  useEffect(() => {
    if (role !== 'user') {
      navigate('/login')
    }


    const fetchuser = async () => {
      try {
        const response = await axios.get(`${api}/api/post/get/${username}`)
        setUser(response.data.user);
        console.log(response.data);
        
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchuser()
  }, [navigate, username])

  return (
    <div className='container mx-auto'>
      <h2>Welcome {user?.username}</h2>
      <Button
        name="Logout"
        onClick={handleClick}
        type="submit" // This makes it submit the form
        className="py-2 px-4 bg-blue-600 text-white"
      />
      {/* Renders child routes here */}
      <Outlet />
    </div>
  );
};

export default User;
