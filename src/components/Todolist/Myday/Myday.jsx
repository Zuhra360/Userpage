import React from 'react'
import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient';
import {  Divider} from "@mantine/core";

export const Myday = () => {
  
  const [datatodo, setDatatodo] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: for showing loading state
  const [error, setError] = useState(null); // Optional: for handling error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Optional: start loading state
      const { data, error } = await supabase
        .from('todolist')
        .select('*');

      if (error) {
        console.error(error);
        setError(error.message); // Optional: set error state
      } else {
        setDatatodo(data); // Set the fetched data
      }
      setLoading(false); // Optional: end loading state
    };

    fetchData();
  }, []);

  return (
    <div className='h-screen flex flex-col w-auto bg-white'>
      <div className='flex flex-col bg-gradient-to-r from-violet-500 to-fuchsia-500 h-56'>
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
              <input type="checkbox" />
              <span className='text-xl'>{item.task}</span>
              
            </li>
            ))}
            <Divider size="sm"/>
          </ul>
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
};