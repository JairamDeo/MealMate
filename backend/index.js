const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const mongoDB = require("./db")
mongoDB();

const FrontendURL = process.env.FRONTEND_URL;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Middleware CORS handling
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", FrontendURL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(cors());
app.use(cors({ origin: FrontendURL, credentials: true }));
app.use(express.json());


//routes
app.use(express.json())
app.use('/api' , require("./Routes/CreateUser"));
app.use('/api' , require("./Routes/DisplayData"));
app.use('/api' , require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})