import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword, useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import FacebookLogo from '../../Assets/Social/facebook.svg';
import GoogleLogo from '../../Assets/Social/google.svg';
import GithubLogo from '../../Assets/Social/github.svg';
import Spinner from '../Spinner/Spinner';
import { sendEmailVerification } from 'firebase/auth';
import toast from 'react-hot-toast';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [user] = useAuthState(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, fUser, fLoading, fError] = useSignInWithFacebook(auth);
    const [signInWithGithub, gitUser, gitLoading, gitError] = useSignInWithGithub(auth);

    const { register, formState: { errors }, handleSubmit, reset, trigger } = useForm();
    const [
        createUserWithEmailAndPassword,
        EmailUser,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const navigate = useNavigate();


    let signInError;

    if (loading || gLoading || fLoading || gitLoading) {
        return <Spinner></Spinner>
    }

    if (error || gError || fError || gitError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }



    const onSubmitParam = async data => {
        const { email, password, number } = data;
        const registeredUser = { email, password, number };
        await createUserWithEmailAndPassword(email, password);

        fetch(`https://murmuring-ridge-59282.herokuapp.com/users`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(registeredUser)
        })
            .then(res => res.json())
            .then(data => {
                toast.success("User created successfully")
            }
            )

        navigate('/');
        reset()
    }
    return (
        <>
            <h1 className='text-center text-primary text-2xl font-bold pt-10 mb-5'>(OPC) PRIVATE LIMITED</h1>
            <div className='flex h-screen justify-center items-center'>
                <div className="card w-96 bg-base-100 shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmitParam)}>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-semibold text-black">Email id</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="enter your email id"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })}
                                    onKeyUp={(e) => {
                                        trigger('email')
                                        setEmail(e.target.value)
                                    }}
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-semibold text-black">Phone Number</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="enter your phone number"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("number", {
                                        required: {
                                            value: true,
                                            message: 'Number is Required'
                                        },
                                        pattern: {
                                            value: /[2-9]{2}\d{8}/,
                                            message: 'Provide a valid Number'
                                        }
                                    })}
                                    onKeyUp={(e) => {
                                        trigger('number')
                                    }}
                                />
                                <label className="label">
                                    {errors.number?.type === 'required' && <span className="label-text-alt text-red-500">{errors.number.message}</span>}
                                    {errors.number?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.number.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs mt-2">
                                <label className="label">
                                    <span className="label-text font-semibold text-black">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="enter your password"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                                            message: "At least one uppercase, one lowercase, one number and one special character"
                                        }
                                    })}
                                    onKeyUp={() => {
                                        trigger('password')
                                    }}
                                />
                                <label className="label">
                                    <small className='text-red-500'>{errors?.password?.message}</small>
                                </label>
                            </div>
                            <div className="text-center mt-10">
                                <input className='btn btn-primary w-1/2 max-w-xs text-white' type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <p className='text-center'><small>Already have an account? <Link className='text-primary' to="/login">Please login</Link></small></p>

                        {/* <div className='flex flex-row items-center justify-center'>
                            <button onClick={() => signInWithFacebook()} className='mx-4'><img className='w-9' src={FacebookLogo} alt="" /></button>
                            <button onClick={() => signInWithGoogle()} className='mx-4'><img className='w-9' src={GoogleLogo} alt="" /></button>
                            <button onClick={() => signInWithGithub()} className='mx-4'><img className='w-9' src={GithubLogo} alt="" /></button>
                        </div> */}
                    </div>
                </div>
            </div >
        </>
    );
};

export default SignUp;