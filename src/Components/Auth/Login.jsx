import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import FacebookLogo from '../../Assets/Social/facebook.svg';
import GoogleLogo from '../../Assets/Social/google.svg';
import GithubLogo from '../../Assets/Social/github.svg';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithFacebook, useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';

const Login = () => {
    const { register, formState: { errors }, handleSubmit, reset, trigger } = useForm();
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [signInWithFacebook, fUser, fLoading, fError] = useSignInWithFacebook(auth);
    const [signInWithGithub, gitUser, gitLoading, gitError] = useSignInWithGithub(auth);
    const [email, setEmail] = useState('');
    const [user] = useAuthState(auth);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const [
        signInWithEmailAndPassword, user1,
        loading,
        error1,
    ] = useSignInWithEmailAndPassword(auth);

    //if user is logged in, redirect to the last visited page
    useEffect(() => {
        if (user) {
            navigate(from, { replace: true })
        }
    })

    const onSubmitParam = data => {
        signInWithEmailAndPassword(data.email, data.password);
    }
    useEffect(() => {
        if (gError || fError || gitError || error1) {
            toast.error("Wrong email or password!", {
                toastId: "passWrong"
            });
            return;
        }
    }, [gError, error1, gitError, fError]);


    if (gLoading || fLoading || gitLoading || loading) {
        return <Spinner />
    }


    return (
        <>
            <h1 className='text-center text-primary text-2xl font-bold pt-10 mb-5'>(OPC) PRIVATE LIMITED</h1>
            <div className='flex justify-center items-center'>
                <div className="card w-96 bg-base-100 shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold mb-2">Login</h2>
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
                                    onKeyUp={(e) => {
                                        trigger('password')
                                    }}
                                />
                                <label className="label">
                                    <small className='text-red-500'>{errors?.password?.message}</small>
                                </label>
                            </div>
                            <div className="text-center mt-10">
                                <input className='btn btn-primary w-1/2 max-w-xs text-white' type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='text-center'><small>Don't have an account? <Link className='text-primary' to="/signup">Join Now</Link></small></p>
                        <div className="divider">OR</div>
                        <div className='flex flex-row items-center justify-center'>
                            <button onClick={() => signInWithFacebook()} className='mx-4'><img className='w-9' src={FacebookLogo} alt="" /></button>
                            <button onClick={() => signInWithGoogle()} className='mx-4'><img className='w-9' src={GoogleLogo} alt="" /></button>
                            <button onClick={() => signInWithGithub()} className='mx-4'><img className='w-9' src={GithubLogo} alt="" /></button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Login;