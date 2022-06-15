import React, { useState } from 'react';
import { Transition } from "@headlessui/react";
import CustomLink from '../CustomLink/CustomLink';
import { useNavigate } from 'react-router-dom';
import { BsFacebook, BsLinkedin, BsGithub } from 'react-icons/bs';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import Modal from '../Home/Table/Modal';

const Navbar = () => {
    const user = useAuthState(auth)
    const navigate = useNavigate();
    //Signout------->
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                toast.success('Log Out Successfully')
                navigate('/login');
            })
    }
    return (
        <>
            <div className="bg-[#0F1729] hidden md:block">
                <div className="flex justify-between items-center h-12 container mx-auto">
                    <div className=" text-white text-md">
                        <p>Md Moniruzzaman | MERN Stack Developer</p>
                    </div>
                    <div className="right-icon flex text-white">
                        <a href="https://www.facebook.com/moniruzzaman255/"><BsFacebook className='ml-8 text-xl'></BsFacebook></a>
                        <a href="https://www.linkedin.com/in/moniruzzaman25/"><BsLinkedin className='ml-8 text-xl'></BsLinkedin></a>
                        <a href="https://github.com/Moniruzzaman2525"><BsGithub className='ml-8 text-xl'></BsGithub></a>
                    </div>
                </div>
            </div>

            <nav className="bg-primary py-4 sticky top-0 z-50 bg-clip-padding bg-opacity-30 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between md:block">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 w-fit">
                                <h1 onClick={() => navigate('/')}
                                    className="text-[#0F1729] cursor-pointer uppercase text-xl md:text-2xl font-bold logo">
                                    (OPC) Private Limited
                                </h1>
                            </div>
                            <div className="hidden md:flex justify-between items-center md:ml-auto">
                                <div className="nav-item ml-10 flex items-baseline space-x-4 text-lg">
                                    <CustomLink
                                        to="/"
                                        className="nav-btn text-xl px-3 py-2 rounded-md font-medium"
                                    >
                                        Home
                                    </CustomLink>
                                </div>
                                {
                                    user[0]?.displayName && <h1 className='cursor-pointer text-xl font-bold border border-gray-500 rounded-sm text-primary px-1' onClick={() => navigate(`dashboard/my-profile`)}>{user[0]?.displayName.split(' ')[0]}</h1>
                                }
                                {
                                    user[0] ? <button onClick={handleSignOut} className='md:ml-24 text-white bg-primary border-2 border-secondary hover:border-2 hover:border-primary hover:bg-gradient hover:text-white  transition-all transition-duration:150ms font-medium hover:font-medium px-5 py-1 rounded-md'>Logout</button> : <button onClick={() => navigate('/login')} className='md:ml-24 text-white bg-primary border-2 border-secondary hover:border-2 hover:border-primary hover:bg-gradient hover:text-white transition-all transition-duration:150ms font-medium hover:font-medium px-5 py-1 rounded-md'>Login</button>
                                }
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <CustomLink
                                to="/"
                                className="nav-btn text-xl px-3 py-2 rounded-md font-medium"
                            >
                                Home
                            </CustomLink>
                            {
                                user[0] ? <button onClick={handleSignOut} className='md:ml-24 text-sm md:hidden block text-white bg-primary border-2 border-secondary hover:border-2 hover:border-primary hover:bg-gradient hover:text-white transition-all transition-duration:150ms font-medium hover:font-medium px-3 py-1 rounded-md'>Logout</button> : <button onClick={() => navigate('/login')} className='md:ml-24 text-sm md:hidden block text-white bg-primary border-2 border-secondary hover:border-2 hover:border-primary hover:bg-gradient hover:text-white transition-all transition-duration:150ms font-medium hover:font-medium px-3 py-1 rounded-md'>Login</button>
                            }

                        </div>
                    </div>
                </div>


            </nav>
        </>
    );
};

export default Navbar;