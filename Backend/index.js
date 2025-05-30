import express, { urlencoded } from "express";
import cors from "cors";
import DbConnet from "./config/db.connection.js";
import FormModel from "./Models/form.model.js";

const app = express();
const PORT = 3006;

DbConnet();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true, limit: "100kb" }));

app.get("/", (req, res) => {
  res.send("home page");
});
// create user from form

app.post("/userdata", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(400).json({
      message: "name and email is required to savethe data in Data base",
    });
  }

  try {
    const saveData = await FormModel.create({ name, email });
    saveData.save();
    res.status(201).json({ message: `data save to DB , ${(name, email)}` });
  } catch (error) {
    console.log(`error in user data API, ${error.message}`);
  }
});


// get users from database

app.get("/getuser", async (req, res) => {
  try {
    
    const usersFromDb = await FormModel.find();
    console.log(usersFromDb);
    res.status(200).json(usersFromDb);


  } catch (error) {
    console.log(error.message, `failed to fetch data from DB`);
  }
});


// update user 
app.put("/getuser/:id",async (req, res)=>{
 const id = req.params.id
 const {name, email} = req.body
 try {

const resById = await FormModel.findByIdAndUpdate(id,{name,email},{new:true})

if (!resById) {
  return res.status(404).json({ message: "User not found" });
}
  res.status(200).json(resById)
 } catch (error) {
  console.log('user not found', error.message);
 }
})

// delete user

app.delete("/delete/:id",async(req, res)=>{
const id = req.params.id
  try {
    if(!id){
      res.status(404).json({message:'user not found'})
    }
   const deletedUser = await FormModel.findByIdAndDelete(id) 
   res.status(200).json(`deleted User ${deletedUser}`)
  } catch (error) {
    res.status(400).json({message : `failed ti deleted user ${id}`})
  }
});

app.delete("/deleteAll",async (req, res)=>{
  try {
    await FormModel.deleteMany({})
    res.status(200).json({message: 'All user deleted'})
    
  } catch (error) {
    res.status(400).json({ message: "Failed to delete All users" });
    
  }
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
