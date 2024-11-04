import React, { useState } from 'react';
import Header from '../Components/Header/Header';
import Input from '../Components/Layouts/Input';
import Button from '../Components/Layouts/Button';
import axios from 'axios';
import api from '../api/api';
import { notifyError, notifySuccess } from '../Components/Layouts/Toast';
import { ToastContainer } from 'react-toastify';
import data from '../json/data.json';

const Home = () => {
    const inputuser = [
        { name: "username", type: "text", label: "Username", icon: "ph:user", placeholder: "Enter your username" },
        { name: "email", type: "email", label: "Email", icon: "carbon:email", placeholder: "Enter your email" },
        { name: "phone", type: "tel", label: "Phone number", icon: "ion:call-outline", placeholder: "Enter your phone number" },
        { name: "address", type: "text", label: "Address", icon: "bx:map", placeholder: "Enter your address" },
        { name: "message", type: "textarea", label: "Message", icon: "ph:user", placeholder: "Enter your message" },
        { name: "image", type: "file", label: "Upload Image", placeholder: "Upload your image" },
    ];

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
        message: "",
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

    const handleClick = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(user).forEach(([key, value]) => {
            data.append(key, value);
        });
        try {
            const res = await axios.post(`${api}/api/createuser`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setUser({
                username: "",
                email: "",
                phone: "",
                address: "",
                message: "",
                image: null,
            });
            notifySuccess(res.data.msg);
            console.log(res.data);
            
        } catch (error) {
            notifyError(error.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    const userdata = data.slice(3,5);

    return (
        <>
            <ToastContainer />
            <Header />
            <div>
                {
                    userdata.map((item,index)=>{
                        return (
                            <span key={index}>
                                <h1>{item.name}</h1>
                                <p>{item.description}</p>
                            </span>
                        )
                    })
                }
            </div>
            <div className="container mx-auto w-6/12">
                <form className="grid grid-cols-2 gap-4">
                    {inputuser.map((item, index) => (
                        item.type === 'textarea' ? (
                            <div key={index} className="col-span-2">
                                <label htmlFor={item.name} className="block">{item.label}</label>
                                <textarea
                                    name={item.name}
                                    placeholder={item.placeholder}
                                    rows={8}
                                    onChange={handleChange}
                                    value={user[item.name]}
                                    className="w-full py-2 outline-none focus:border-blue-600 border bg-zinc-100 rounded-xl ps-6 border-black"
                                />
                            </div>
                        ) : (
                            <div key={index}>
                                <Input
                                    className="w-full py-2 outline-none focus:border-blue-600 border bg-zinc-100 rounded-full ps-10 border-black"
                                    label={item.label}
                                    type={item.type}
                                    name={item.name}
                                    value={item.type !== 'file' ? user[item.name]  : null }
                                    onChange={handleChange}
                                    icon={item.icon}
                                    placeholder={item.placeholder}
                                />
                            </div>
                        )
                    ))}
                </form>
                <div className="w-full my-5">
                    <Button
                        name="Submit"
                        onClick={handleClick}
                        className="py-2 px-4 bg-blue-600 text-white"
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
