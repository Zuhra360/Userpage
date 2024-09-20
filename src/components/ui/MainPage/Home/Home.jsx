import React from 'react'
import { useEffect, useState } from 'react';
import { supabase } from '../../../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

export const Home = () => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState('');
  const [user, setUser] = useState(null);
  const [datatodo, setDatatodo] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: for showing loading state
  const [error, setError] = useState(null); // Optional: for handling error state

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser(); // Fetch logged-in user
      if (user) {
        setUser(user);
        fetchData(user.id); // Fetch tasks for this user
      } else {
        setError('User not found');
      }
    };

    fetchUser();
  }, []);

  // Fetch tasks for the logged-in user
  const fetchData = async (userId) => {
    
    setLoading(true);
    const { data, error } = await supabase
      .from('Userdata')
      .select('*')
      .eq('user_id', userId); // Filter tasks by user_id
      
    if (error) {
      setError(error.message);
    } else {
      setDatatodo(data);
    }
    setLoading(false);
  };

  // Add a new task for the logged-in user
  const addTask = async () => {
    if (newTask.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }

    const { data, error } = await supabase
      .from('Userdata')
      .insert([{ task: newTask, user_id: user.id }]); // Insert task with user_id

    if (error) {
      setError(error.message);
    } else {
      setDatatodo([...datatodo, ...data]); // Update the list with the new task
      setNewTask(''); // Clear input
    }
  };

  // Delete a task for the logged-in user
  const deleteTask = async (id) => {
    const { error } = await supabase
      .from('Userdata')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id); // Ensure only the user's task is deleted

    if (error) {
      setError(error.message);
    } else {
      setDatatodo(datatodo.filter((item) => item.id !== id)); // Update list after deletion
    }
  };

  return (
    <div className='h-screen flex flex-col w-full '>
      <div className=' flex flex-row justify-between h-24 w-full bg-black text-white'>
        <h1 className='text-4xl font-bold p-4'>Welcome Home</h1>
        <div className='mr-12'>
        {user ? (
            <>
              <p className='p-2'>{user.email}</p>
              <p>{user.name}</p>
              {/* Display additional user data if available */}
            </>
          ) : (
            <p>Loading user info...</p>
          )}
        </div>
      </div>

      <div className='w-full bg-gray-200 h-screen text-black p-4'>
      <div className='flex mb-4'>
          <input
            type='text'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className='border-2 border-black p-2 w-full rounded'
            placeholder='Add new task'
          />
          <button
            onClick={addTask}
            className='bg-black text-white px-4  ml-2 rounded'
          >
            Add 
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : datatodo.length > 0 ? (
          <ul>
            {datatodo.map((item) => (
              <li key={item.id} className="flex items-center  justify-between space-x-2 w-[100%] bg-white px-2 py-2 ">
                <div>
                <input
                  type="checkbox"
                  className="form-checkbox rounded-full text-blue-600 w-4 h-4 p-2" // Customize size and color
                />

                <span className='text-xl p-2'>{item.task}</span>
                </div>
                
                <button
                  onClick={() => deleteTask(item.id)}
                  className=' px-2 py-1 rounded'
                >
                  <MdDelete className='text-gray-600 text-2xl' />
                  
                </button>
                
                
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks found</p>
        )}
       
      </div>


    </div>
  );
};

{/* <div className='flex flex-col bg-gradient-to-r from-violet-500 to-fuchsia-500 h-56'>
        <h1 className='mt-36 p-2 text-5xl font-bold text-white'>My Day</h1>
      </div>

      <div className='text-black p-4'>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : datatodo.length > 0 ? (
          <ul>
            {datatodo.map((item) => (
              <li key={item.id} className="flex items-center space-x-2 w-[100%] py-4">
              <span className='text-xl'>{item.task}</span>
              
            </li>
            ))}
            
          </ul>
        ) : (
          <p>No data found</p>
        )}
      </div> */}