import mongoose from "mongoose";
const DbConnet = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connection successfull`);
  } catch (error) {
    console.log(`DB Connection failed !!`);
  }
};

export default DbConnet;
