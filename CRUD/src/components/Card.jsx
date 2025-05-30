import axios from "axios";
import { React, useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Card = () => {
  const [user, setUser] = useState([]);
  const [editName, seteditName] = useState('')
  const [editEmail, seteditEmail] = useState('');
  const [editId, seteditId] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userdata = await axios.get("http://localhost:3006/getuser");

        setUser(userdata.data);
      } catch (error) {
        console.log(`failed to fetch data ${error.message}`);
      }
    };
    fetchData();
  }, []);

  // Move fetchData outside useEffect so it can be reused
  const fetchData = async () => {
    try {
      const userdata = await axios.get("http://localhost:3006/getuser");
      setUser(userdata.data);
    } catch (error) {
      console.log(`failed to fetch data ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3006/getuser/${id}`, {
        name: editName,
        email: editEmail,
      });
      seteditId(null);
      fetchData();
    } catch (err) {
      console.log("Update failed", err.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      const DeletedUser = await axios.delete(`http://localhost:3006/delete/${id}`);
      fetchData()
    } catch (error) {
      console.log('failed to delete user', error.message);
    }
  };

  return (
    
    <>
      {user.map((elem) => {
        return (
          <div
            key={elem._id}
            className="bg-green-400 h-auto w-[80%] md:w-[200px] border-white rounded-xl py-2 px-2 text-center m-2 overflow-hidden"
          >
            {editId === elem._id ? (
              <div className="">
                <input
                  value={editName}
                  onChange={(e) => seteditName(e.target.value)}
                  className="mb-2 px-2 py-1 rounded border border-black w-full"
                />
                <input
                  value={editEmail}
                  onChange={(e) => seteditEmail(e.target.value)}
                  className="mb-2 px-2 py-1 rounded border border-black w-full"
                />
                <button
                  onClick={() => handleUpdate(elem._id)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold">
                  {" "}
                  {elem.name} <br />{" "}
                </h2>
                <h2 className="text-l font-semibold pt-5">
                   {elem.email}
                </h2>
                <div className="mt-5 flex justify-evenly ">
                  <button
                    className="px-2 py-1 bg-blue-600 rounded-xl font-bold text-white"
                    onClick={() => {
                      seteditId(elem._id);
                      seteditName(elem.name);
                      seteditEmail(elem.email);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    // onClick={()=>{handleDelete(elem._id);}}
                    onClick={() => {
                      handleDelete(elem._id);
                    }}
                    className="px-2 py-1 bg-red-500 rounded-xl font-bold text-white"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Card;
