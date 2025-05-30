import {React, useState} from 'react'
import axios from 'axios';


const Form = ({ fetchData }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const Data = {
    name: name,
    email: email,
  };

  const submitHandler = async (e) => {
    // e.preventDefault();
    console.log(`submitted`);
    try {
      const res = await axios.post("http://localhost:3006/userdata", Data);
      
    } catch (error) {
      console.log(`failed to sent data to Backend`);
    }

    setname("");
    setemail("");
    fetchData()
  };
  return (
    <div>
      <form
        className=" bg-yellow-400 py-10 m-auto rounded-xl text-center w-[95%] mt-4   "
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl">Enter Your name :</h2>
        <input
          value={name}
          onChange={(e) => {
            setname(e.target.value);
            
          }}
          type="text"
          placeholder="Enter you name "
          className="border-2 border-emerald-400  text-center rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[90%] mb-6"
        />
        <h2 className="text-2xl ">Enter Your Email :</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
         
          }}
          placeholder="Enter your Email "
          className="border-2 border-emerald-400 rounded  text-center px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[90%] mb-6"
        />
        <br />
        <button className="bg-red-400 w-[50%] p-3 rounded-xl mt-5 hover:bg-red-500 text-xl">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form