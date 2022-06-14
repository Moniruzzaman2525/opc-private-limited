import React, { useState } from 'react';
import { Transition } from "@headlessui/react";
import CustomLink from '../CustomLink/CustomLink';
import { Link, useNavigate } from 'react-router-dom';
import { BsFacebook, BsLinkedin, BsGithub } from 'react-icons/bs';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useAuthState(auth)
    // console.log(user[0]?.displayName);
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
                        <a href="https://www.facebook.com/ayon.jodder.75/"><BsFacebook className='ml-8 text-xl'></BsFacebook></a>
                        <a href="https://www.linkedin.com/in/ayon-jodder/"><BsLinkedin className='ml-8 text-xl'></BsLinkedin></a>
                        <a href="https://github.com/AyonJD"><BsGithub className='ml-8 text-xl'></BsGithub></a>
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
                                    Deskala
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
                                    <CustomLink
                                        to="/create-candidate"
                                        className="nav-btn text-xl px-3 py-2 rounded-md font-medium"
                                    >
                                        Create Candidate
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
                            {
                                user[0] ? <button onClick={handleSignOut} className='md:ml-24 text-sm md:hidden block text-white bg-primary border-2 border-secondary hover:border-2 hover:border-primary hover:bg-gradient hover:text-white transition-all transition-duration:150ms font-medium hover:font-medium px-3 py-1 rounded-md'>Logout</button> : <button onClick={() => navigate('/login')} className='md:ml-24 text-sm md:hidden block text-white bg-primary border-2 border-secondary hover:border-2 hover:border-primary hover:bg-gradient hover:text-white transition-all transition-duration:150ms font-medium hover:font-medium px-3 py-1 rounded-md'>Login</button>
                            }
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-gray-900 ml-5 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-800 transform"
                    enterFrom="opacity-0 scale-50"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div ref={ref} className="mobile-nav px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <CustomLink
                                    to="/"
                                    className="hover:bg-gray-700 hover:text-white text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Home
                                </CustomLink>
                                <CustomLink
                                    to="/create-candidate"
                                    className="hover:bg-gray-700 hover:text-white text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Create Candidate
                                </CustomLink>

                            </div>
                        </div>
                    )}
                </Transition>
            </nav>
        </>
    );
};

export default Navbar;