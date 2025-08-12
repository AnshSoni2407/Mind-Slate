import {React, useState} from 'react'
import axios from 'axios';


const Form = ({ fetchData }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const Data = {
    title: title,
    body: body,
  };

  const submitHandler = async (e) => {
    // e.preventDefault();
    console.log(`submitted`);
    try {
      const res = await axios.post("http://localhost:3006/api/userdata", Data);
      
    } catch (error) {
      console.log(`failed to sent data to Backend`);
    }

    setTitle("");
    setBody("");
    fetchData()
  };
  return (
    <div>
      <form
        className=" bg-yellow-400 py-10 m-auto rounded-xl text-center w-[95%] mt-4   "
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl">Tittle</h2>
        <input
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          placeholder="Enter the Tittle"
        
          className="border-2 border-emerald-400  text-center rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[90%] mb-6"
        />
        <h2 className="text-2xl ">Content</h2>
        <input
          type="text"
          required
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          placeholder="write description here.."
          className="border-2 border-emerald-400 rounded   text-center px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[90%] mb-6"
        />
        <br />
        <button className="bg-red-400 w-1/4 hover:w-1/2 transition-all duration-300 cursor-pointer p-3 rounded-xl mt-5 hover:bg-red-500 text-xl"> 
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form