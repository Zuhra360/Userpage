import React, { useState } from 'react';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { supabase } from '../../../../supabaseClient';
export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      profession:'',
      email: '',
      password:'',
      confirmpassword:'',
    },
    
    onSubmit: async (values) => {
      const { email, password, name, profession } = values;
      if (password !== values.confirmpassword) {
        toast.error('Passwords do not match');
        return;
      }

      try {
        // Send magic link for email authentication
        let { error } = await supabase.auth.signInWithOtp({
          email,
        });

        if (error) {
          throw error;
        }
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, name, profession }]);

        if (profileError) {
          throw profileError;
        }
        toast.success('Magic link sent! Check your email to sign in.');
      } catch (error) {
        toast.error(`Error: ${error.message}`);
      }

      const { error: insertError } = await supabase
    .from('Userdata')
    .insert({
      user_id: user.id, // Assuming user.id is the unique identifier
      name,
      profession,
      email
    });

  if (insertError) {
    throw insertError;
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
    if (!values.Name) {
      errors.Name = 'Required';
    } else if (values.Name.length > 8) {
      errors.Name = 'Must be 20 characters or less';
    }
    if (!values.profession) {
      errors.profession = 'Required';
    } else if (values.profession.length > 8) {
      errors.profession = 'Must be 20 characters or less';
    }
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length > 8) {
      errors.password = 'Must be 8 characters or more';
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = 'Required';
    } else if (values.confirmpassword.length > 8) {
      errors.confirmpassword = 'Must be 8 characters or more';
    }
    return errors;
  };
    return (
       
        <div className='w-[100%] bg-white h-screen flex justify-center'>

          <div className='w-8/12 h-full flex justify-center flex-col items-center '>
            <h1 className='text-4xl font-bold mt-6 p-2'>Sign Up </h1>
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

              <div className="flex flex-col  text-lg  ">
              <label  className="mr-24" htmlFor="Name"> Name </label>
              <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="border-2 border-black w-80 p-1 text-base rounded bg-gray-200 "
              />
              </div>
              {formik.errors.name ? <div>{formik.errors.name}</div> : null}

              <div className="flex flex-col  text-lg   ">
              <label  className="mr-24" htmlFor="profession"> Profession </label>
              <input
                  id="profession"
                  name="profession"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.profession}
                  className="border-2 border-black w-80 p-1 text-base rounded bg-gray-200 "
              />
              </div>
              {formik.errors.profession ? <div>{formik.errors.profession}</div> : null}
  
              <div className="relative flex flex-col  text-lg  ">
              <label  className="mr-24" htmlFor="password"> Password </label>
              <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="border-2 text-black border-black w-80 p-1 text-base rounded bg-gray-200 "
              />
              
              </div>
              {formik.errors.password ? <div>{formik.errors.password}</div> : null}

              <div className="relative flex flex-col  text-lg  ">
              <label  className="mr-24" htmlFor="password">Confirm Password </label>
              <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type={showPassword ? 'text' : 'password'}
                  onChange={formik.handleChange}
                  value={formik.values.confirmpassword}
                  className="border-2 text-black border-black w-80 p-1 text-base rounded bg-gray-200 "
              />
              
              </div>
              {formik.errors.confirmpassword ? <div>{formik.errors.confirmpassword}</div> : null}
   
              <button  className="font-medium text-lg items-center bg-black text-white px-8 mt-8 py-1 rounded-lg" type="submit">Sign Up</button>
              <Toaster />
              <a href="/" className='text-blue-600'>Login?</a>
              </form>
            </div>
          </div>



        </div>
  
      
  
  
  )
}



