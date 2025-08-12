import React from 'react'
import './App.css'
import CardList from './components/CardList'
import Form from './components/Form'
import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {

    const [user, setUser] = useState([]);


  const fetchData = async () => {
    try {
      const userdata = await axios.get("http://localhost:3006/api/getuser");
      setUser(userdata.data);
    } catch (error) {
      console.log(`Failed to fetch data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Form fetchData={fetchData} />
      <CardList fetchData={fetchData} />
    </>
  );
}

export default App