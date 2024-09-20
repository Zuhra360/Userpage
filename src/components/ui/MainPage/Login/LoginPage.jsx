import { Box } from '@mantine/core'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '../../../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        // Log in using Supabase
        let { error } = await supabase.auth.signInWithOtp({
          email,
        });


        if (error) {
          throw error;
        }

        toast.success('Login Successful!');
        // Redirect to home page
        navigate('/Home');
      } catch (error) {
        toast.error(`Login failed: ${error.message}`);
      }
    },
  });
  const validate = values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length > 8) {
      errors.password = 'Must be 8 characters or more';
    }
    return errors;
  };
  return (
    <div className='flex flex-col h-screen w-full'>
      
      <Box className='w-[100%] bg-white h-screen flex justify-center'>
        <div className='w-8/12 h-full flex justify-center flex-col items-center'>
          <h1 className='text-4xl font-bold mt-12 p-2'>Login </h1>
          <div className='flex flex-col w-80 bg-white h-96 p-4'>

          <form  className="flex flex-col gap-4 items-center" onSubmit={formik.handleSubmit}>
            
            <div className="flex flex-col  text-lg  ">
            <label className="mr-5" htmlFor="email">Email </label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="border-2 border-black w-80 p-1 text-base rounded bg-gray-200"
            />
            </div>
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}

            <div className="relative flex flex-col  text-lg   ">
            <label   htmlFor="password"> Password </label>
            <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                onChange={formik.handleChange}
                value={formik.values.password}
                className="border-2 text-black border-black w-80 p-1 text-base rounded bg-gray-200 "
            />
              
            </div>
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
 
            <button  className="font-medium text-lg items-center bg-black text-white px-8 mt-8 py-1 rounded-lg" type="submit">Login</button>
            <Toaster 
            toastOptions={{
              className: '',
              style: {
                border: '1px solid #713200',
                padding: '6px',
                color: '#fff',
                background: 'black',
              },
            }}/>
            <p>Don't have an Account?<a href="/SignUp" className='text-blue-600'>Sign Up</a></p>
            </form>
          </div>
        </div>
      </Box>

    </div>
  )
}
