const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT;
const cors = require('cors');

const mongoDB = require("./db")
mongoDB();

const FRONTEND_URL = process.env.FRONTEND_URL;

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

// Middleware CORS handling
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(cors());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());


//routes
app.use(express.json())
app.use('/api' , require("./Routes/CreateUser"));
app.use('/api' , require("./Routes/DisplayData"));
app.use('/api' , require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})