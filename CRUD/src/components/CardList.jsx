import React from 'react'
import Card from './Card'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CardList = () => {
  const [User, setUser] = useState([])

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
  


  return (
    <div className=" w-[95%] flex justify-evenly flex-wrap gap-4 m-auto bg-zinc-600 mt-10 rounded-xl p-4  ">
  
    
      {User.length > 0 ? (
        <Card />
      ) : (
        <div className="text-white text-4xl"> No user Found !!</div>
      )}
    </div>
  );
}

export default CardList