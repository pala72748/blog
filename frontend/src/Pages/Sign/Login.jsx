import React, { useEffect, useState } from 'react';
import Input from '../../Components/Layouts/Input';
import Button from '../../Components/Layouts/Button';
import axios from 'axios';
import api from '../../api/api';
import { notifyError, notifySuccess } from '../../Components/Layouts/Toast';
import { ToastContainer } from 'react-toastify';
import File from '../../Components/Layouts/File';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const inputuser = [

        { name: "email", type: "email", label: "Email", icon: "carbon:email", placeholder: "Enter your email" },
        { name: "password", type: "password", label: "Password", icon: "bitcoin-icons:key-outline", placeholder: "Enter your password" },
    ];

    const [user, setUser] = useState({

        email: "",
        password: "",

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token) {
            if (role === 'admin') {
                navigate('/admin/dashboard')
            } else if (role === 'user'){
                navigate('/user/dashboard')
            }
        }
    },[navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${api}/api/user/login`, user);

            setUser({
                email: "",
                password: "",
            });
            notifySuccess(response.data.msg);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.user.role);
            localStorage.setItem('username',response.data.user.username)

            if (response.data.user.role === 'admin') {
                navigate('/admin/dashboard')
            } else if (response.data.user.role === 'user') {
                navigate('/user/dashboard')
            }

            console.log(response.data.msg, response.data.user);

        } catch (error) {
            notifyError(error.response?.data?.msg);
            console.log(error.response?.data?.msg);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='bg-black'>
                <div className="container mx-auto">
                    <div className='flex flex-col items-center justify-center h-screen'>
                        <div className='w-5/12  bg-white rounded-lg m-12'>
                            <form className="flex flex-col gap-4 p-10" onSubmit={handleSubmit}>
                                {inputuser.map((item, index) => (
                                    <div key={index}>
                                        <Input
                                            className="w-full py-2 outline-none focus:border-blue-600 border bg-zinc-100 rounded-full ps-10 border-black"
                                            label={item.label}
                                            type={item.type}
                                            name={item.name}
                                            value={user[item.name]}
                                            onChange={handleChange}
                                            icon={item.icon}
                                            placeholder={item.placeholder}
                                        />
                                    </div>
                                ))
                                }
                                <div className="w-full my-5">
                                    <Button
                                        name="Login"
                                        type="submit" // This makes it submit the form
                                        className="py-2 px-4 bg-blue-600 text-white"
                                    />
                                </div>
                            </form>
                            <div className='flex justify-center my-4'>
                                <p >Don't have an account? <a className='text-blue-600' href="/register">Register</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
