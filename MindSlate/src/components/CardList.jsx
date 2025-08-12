import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoCloseOutline } from "react-icons/io5";

const CardList = () => {
  const [User, setUser] = useState([]);
  const [expand, setExpand] = useState(false);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  const openExpand = ({ title, description }) => {
    settitle(title);
    setdescription(description);
    setExpand(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userdata = await axios.get("http://localhost:3006/api/getuser");
        setUser(userdata.data);
      } catch (error) {
        console.log(`failed to fetch data ${error.message}`);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (expand) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expand]);

  return (
    <div className="w-[95%] flex justify-evenly flex-wrap gap-4 m-auto bg-zinc-600 mt-10 rounded-xl p-4">
      {User.length > 0 ? (
        <Card openExpand={openExpand} />
      ) : (
        <div className="text-white text-4xl"> No Data Found !!</div>
      )}

      {expand && (
        <>
          {/* 🔲 Overlay */}
          <div className="fixed inset-0 bg-black/2 bg-opacity-50 backdrop-blur-sm z-40"></div>

          {/* 🧾 Modal */}
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          w-[90%] max-w-[700px] max-h-[80%] overflow-y-auto wrap-break-word
                          z-50 p-6 bg-white rounded-xl shadow-lg"
          >
            <button
              className="fixed top-2 right-2 text-xl text-gray-600 hover:text-black cursor-pointer hover:text-2xl "
              onClick={() => {
                setExpand(false);
              }}
            >
              <IoCloseOutline />
            </button>
            <h3 className="font-bold text-2xl mb-4">{title}</h3>
            <p className="text-gray-800 text-base whitespace-pre-line">
              {description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CardList;
