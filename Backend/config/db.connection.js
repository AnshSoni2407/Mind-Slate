import mongoose from "mongoose";
 const DbConnet = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/CRUD");
        console.log(`DB connection successfull`);
    } catch (error) {
        console.log(`DB Connection failed !!`);
    }
 }

 export default DbConnet;