const express = require("express");
const mongoose = require("mongoose");
const { userModel } = require("./models/model");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const connect = async () => {
  return await mongoose
    .connect(
      "mongodb+srv://tilasichandni:yHbBc8z20EPUeJHJ@cluster0.ai25f7c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("error is" + err);
    });
};
connect();
//create user
app.post("/cu", async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user
app.get("/", async (req, res) => {
  try {
    const alluserData = await userModel.find({});
    res.json(alluserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update user
app.put("/updateUser", async (req, res) => {
  const all_data = req.body;

  try {
    const data = await userModel.findByIdAndUpdate(
      { _id: all_data.id },
      all_data.userInfo
    );
    res.json(data);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

//delete user

app.post("/deleteUser", async (req, res) => {
  const all_data = req.body;

  try {
    const data = await userModel.findByIdAndDelete({ _id: all_data.id });
    res.json(data);
  } catch {
    (err) => {
      res.status(500).json(err);
    };
  }
});

// delete user

app.listen(3000, () => {
  console.log("i am listening you");
});
