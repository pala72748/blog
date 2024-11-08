import React, { useState } from 'react';
import Input from '../../Components/Layouts/Input';
import Button from '../../Components/Layouts/Button';
import axios from 'axios';
import api from '../../api/api';
import { notifyError, notifySuccess } from '../../Components/Layouts/Toast';
import { ToastContainer } from 'react-toastify';
import File from '../../Components/Layouts/File';

const Register = () => {
    const inputuser = [
        { name: "username", type: "text", label: "Username", icon: "ph:user", placeholder: "Enter your username" },
        { name: "email", type: "email", label: "Email", icon: "carbon:email", placeholder: "Enter your email" },
        { name: "password", type: "password", label: "Password", icon: "bitcoin-icons:key-outline", placeholder: "Enter your password" },
        { name: "image", type: "file", label: "Upload Image", placeholder: "Upload your image" },
    ];

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setUser({ ...user, [name]: files[0] });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(user).forEach(([key, value]) => {
            data.append(key, value);
        });
        try {
            const response = await axios.post(`${api}/api/user/register`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setUser({
                username: "",
                email: "",
                password: "",
                image: null,
            });
            notifySuccess(response.data.msg);
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
                            <form className="flex flex-col gap-4 px-10" onSubmit={handleSubmit}>
                                {inputuser.map((item, index) => (
                                    item.type === 'file' ? (
                                        <File
                                            key={index}
                                            name={item.name}
                                            label={item.label}
                                            type={item.type}
                                            onChange={handleChange}
                                        />
                                    ) : (
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
                                    )
                                ))}
                                <div className="w-full my-5">
                                    <Button
                                        name="Submit"
                                        type="submit" // This makes it submit the form
                                        className="py-2 px-4 bg-blue-600 text-white"
                                    />
                                </div>
                            </form>
                            <div className='flex justify-center my-4'>
                                <p >Already Have an Account <a className='text-blue-600' href="/login">Login</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
