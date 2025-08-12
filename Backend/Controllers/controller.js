import FormModel from "../Models/form.model.js";

export const createData = async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400).json({
      message: "title and body is required to savethe data in Data base",
    });
  }

  try {
    const saveData = await FormModel.create({ title, body });
    saveData.save();
    res.status(201).json({ message: `data save to DB , ${(title, body)}` });
  } catch (error) {
    console.log(`error in user data API, ${error.message}`);
  }
};

// get user data

export const getData = async (req, res) => {
  try {
    const usersFromDb = await FormModel.find();
    res.status(200).json(usersFromDb);
  } catch (error) {
    console.log(error.message, `failed to fetch data from DB`);
  }
};

// update user
export const updateData = async (req, res) => {
  const id = req.params.id;
  const { title, body } = req.body;
  try {
    const resById = await FormModel.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );

    if (!resById) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(resById);
  } catch (error) {
    console.log("user not found", error.message);
  }
};

// delete user

export const deleteData = async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      res.status(404).json({ message: "user not found" });
    }
    const deletedUser = await FormModel.findByIdAndDelete(id);
    res.status(200).json(`deleted User ${deletedUser}`);
  } catch (error) {
    res.status(400).json({ message: `failed ti deleted user ${id}` });
  }
};

export const deleteAllData = async (req, res) => {
  try {
    await FormModel.deleteMany({});
    res.status(200).json({ message: "All data deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete All data" });
  }
};
