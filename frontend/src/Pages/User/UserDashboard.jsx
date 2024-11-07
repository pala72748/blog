import React, { useEffect, useState } from 'react'
import Table from '../../Components/Layouts/Table';
import axios from 'axios';
import api from '../../api/api';

const UserDashboard = () => {

  const [userpost, setUserpost] = useState([])
  const username = localStorage.getItem('username');
  useEffect(() => {
    const fetchuserpost = async () => {
      try {
        const response = await axios.get(`${api}/api/post/get/${username}`);
        setUserpost(response.data.post);
        console.log(response.data.post);

      } catch (error) {
        console.log(error);
        
      }
    }
    fetchuserpost();
  }, [username])

  const custom = ['title','category','author','image','Comment','likes']

  return (
    <div>
      <Table data={userpost} filter={custom} />
    </div>
  )
}

export default UserDashboard;