import React, { useState } from 'react';
import {Notebook} from 'lucide-react';
import {Link, useNavigate} from 'react-router';
import { useAuth } from '../context/AuthContext';

function Signup (){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirmed] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const {signup} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(!email || !password || !passwordConfirm){
            return setError('Please fill in all fields')
        }

        if(password !== passwordConfirm){
            return setError('Passwords do not match')
        }

        if(password.length < 6){
            return setError('Passwords must be at least 6 characters');
        }

        try {
            setLoading(true);
            await signup(email,password);
            navigate('/dashboard');
        } catch (err){
            setError('Failed to create account: ' + (err.message || 'Please try again'))
        } finally {
            setLoading(false)
        }
        
    };


    return(
        <div className='max-w-md mx-auto mt-10'>
            <div className='bg-white rounded-lg shadow-md p-8'>
                <div className='flex flex-col items-center mb-6'>
                    <Notebook className='h-12 w-12 text-indigo-600 mb-2'/>
                    <h2 className='text-2xl font-bold text-gray-900'>
                        {''}
                        Create Your Account</h2>
                    <p className='text-gray-600'>Start taking your notes today</p>
                    </div>

                    {
                        error && (
                            <div className='bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm'>{error}{''}</div>
                        )
                    }

                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                                Email
                            </label>
                            <input id='email' type='email' value={email} onChange = {(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='you@example.com' required />
                        </div>

                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                                Password
                            </label>
                            <input id='password' type='password' value={password} onChange = {(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='***********' required />

                            <div className='mt-4'>
                            <label htmlFor='password-confirm' className='block text-sm font-medium text-gray-700 mb-1'>
                                Confirm Password
                            </label>

                            <input id='password-confirm' type='password' value={passwordConfirm} onChange = {(e) => setPasswordConfirmed(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='***********' required />
                            </div>

                        </div>
                        <button className='w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4' type='submit' disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className='mt-6 text-center text-sm'>
                        <p className='text-gray-600'>
                            Already have an account?
                            <Link to="/login" className='text-indigo-600 hover:text-indigo-800 font-medium ml-2'>Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        
    )
}

export default Signup;