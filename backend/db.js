const mongoose = require('mongoose');
require('dotenv').config();

/* connection queries */
const mongoURI = process.env.MONGO_URI;
/* connection queries */

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("db connected");

    const fetched_data = mongoose.connection.db.collection("food_items");
    const foodItemsData = await fetched_data.find({}).toArray();

    const foodCategory = mongoose.connection.db.collection("foodCategory");
    const foodCategoryData = await foodCategory.find({}).toArray();

    // Set global variables after fetching data
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

  } catch (err) {
    console.error("---", err);
  }
};

module.exports = mongoDB;
