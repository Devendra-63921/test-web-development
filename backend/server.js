const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./src/app");


dotenv.config();


const PORT = process.env.PORT || 5000;



const startServer = async () => {
  try {

    // Connect MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");


    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });

  } catch (error) {

    console.error("MongoDB connection failed:");
    console.error(error.message);

    process.exit(1);
  }
};


startServer();
