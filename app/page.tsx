"use client";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import axios from "axios";

interface Todos {
  id: string;
  todo: string;
  created_at: string;
}
interface Update {
  id: string;
  value?: string;
}

export default function Home() {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");
  const [count, setCount] = useState<number>(1);
  const [update, setUpdate] = useState<Update>({ id: "" });
  const [tempValue, setTempValue] = useState<string>(""); // Track user input temporarily
  const baseURL = "https://supabase-todo-alpha-kohl.vercel.app/";

  useEffect(() => {
    async function getdata() {
      try {
        const response = await axios.get(`${baseURL}/api`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getdata();
  }, [count]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${baseURL}/api`, { todo });
      setTodo("");
      setCount((pre) => pre + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${baseURL}/api`, {
        id: update.id,
        value: tempValue,
      });
      setUpdate({ id: "" })
      setCount((pre) => pre + 1);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${baseURL}/api`, {
        data: { id },
      });
      setCount((pre) => pre + 1);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24 bg-violet-300/25">
      <div className="h-24 w-[28rem] bg-white rounded-2xl flex flex-col gap-3 items-center justify-center  shadow">
        <input
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          type="text"
          className="w-[90%] h-10 border-b font-light focus:outline-none "
          placeholder="Type here ....."
        />
        <button
          onClick={handleSubmit}
          className="bg-red-400 px-5 py-1 text-white font-medium rounded-xl  text-sm hover:scale-105 duration-200"
        >
          Submit
        </button>
      </div>

      <div className="flex flex-col gap-2 h-96 overflow-auto">
        {data.map((item: Todos) => (
          <div
            key={item.id}
            className="h-14 w-[28rem] bg-white rounded-lg flex justify-between items-center p-3  duration-200"
          >
            {update.id === item.id ? (
              <>
                <input
                  type="text"
                  className="text-lg font-bold text-[#4F4F4F] focus:outline-none"
                  value={tempValue} // Use temporary value here
                  onChange={(e) => setTempValue(e.target.value)} // Update temporary value
                  autoFocus
                />
                <IoMdSend
                  onClick={handleUpdate}
                  className="text-red-400 cursor-pointer text-2xl mr-2"
                />
              </>
            ) : (
              <>
                <p className="text-lg font-bold text-[#4F4F4F]">{item.todo}</p>
                <div className="flex gap-3 text-2xl ">
                  <FaRegEdit
                    onClick={() => {
                      setTempValue(item.todo); // Initialize temporary value with item.todo
                      setUpdate({ id: item.id });
                    }}
                    className="text-indigo-500 cursor-pointer"
                  />
                  <MdDeleteOutline
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 cursor-pointer"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
