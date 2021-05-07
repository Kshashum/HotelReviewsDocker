// imports required
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const hotelRouter = require("./routes/hotelRouter");
const authRouter = require("./routes/authRouter");
const reviewRouter = require("./routes/reviewRouter");
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//Routers
app.use('/api/v1/hotels', hotelRouter)
app.use('/api/v1/auth', authRouter)
app.use("/api/v1/reviews", reviewRouter)


app.listen(process.env.PORT || 3000, (req, res) => {
    console.log(`listening at port ${process.env.PORT}`);
})