import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../Components/Layouts/Button';

const Admin = () => {

  const navigate = useNavigate();

  const handleClick = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login')
  }

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login')
    }
  })

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <nav>
          <ul>
            <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/admin/users">Manage Users</NavLink></li>
            <li><NavLink to="/admin/posts">Manage Posts</NavLink></li>
            {/* Add other admin links here */}
          </ul>
        </nav>
        <Button
          name="Logout"
          onClick={handleClick}
          type="submit" // This makes it submit the form
          className="py-2 px-4 bg-blue-600 text-white"
        />
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
