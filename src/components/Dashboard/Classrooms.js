'use client'
import { useEffect, useState } from 'react';
import { Tooltip, Button } from 'antd';
import { MdMenu } from "react-icons/md";
import { IoUnlinkSharp } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";


export default function Classrooms({ user_id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  useEffect(() => {
    if (user_id === undefined) {
      console.log('User ID is not defined');
      return;
    }
    else {
    fetch(`http://localhost:5500/api/v1/classrooms/s/classrooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user_id': user_id,
      },
    }).then(async (res) => {
        if (res.status === 200) {
          console.log('Fetched classrooms');
          return res.json();
        }
        else {
          console.log('Failed to fetch classrooms');
        }
      })
    }
  }, [classrooms])

  return (
    <div id="Classroom" className="flex bg-white p-6 rounded-md flex-col">
      <div className="flex flex-col gap-3 justify-left mb-10">
        <h1 className="text-5xl font-bold">Classrooms</h1>
        <p className="text-gray-500 text-sm mx-3">Create, join, and manage classrooms</p>
      </div>
      <div className="flex flex-row ml-6">
        {/* Customizing the Button to be Purple */}
        <Button
          className="rounded-md ml-2 bg-purple-500 border-none hover:bg-purple-600 text-white hover:text-white hover:gap-3"
          onClick={() => setIsModalOpen(true)}
          icon={<IoUnlinkSharp />}
        >

          Invite Link
        </Button>
        
        <Button
          className="rounded-md ml-2 bg-purple-500 border-none hover:bg-purple-600 text-white hover:text hover:gap-3"
          onClick={() => setIsModalOpen(true)}
          icon={<FaPlusCircle />}
        >
          Join Classroom
        </Button>
      </div>
      {/* Classrooms */}
      <div className="flex flex-col gap-3 mt-6">
        {classrooms.map((classroom, index) => (
          <div key={classroom.id} className="flex flex-row justify-between items-center bg-gray-100 p-4 rounded-md">
            <div>
              <h2 className="text-xl font-semibold">{classroom.name}</h2>
              <p className="text-gray-500">{classroom.description}</p>
            </div>
            <Tooltip title="More Options">
              <Button
                className="rounded-md bg-purple-500 border-none hover:bg-purple-600 text-white hover:text-white"
                icon={<MdMenu />}
              />
            </Tooltip>
          </div>
        ))}
        </div>
    </div>
  );
}
