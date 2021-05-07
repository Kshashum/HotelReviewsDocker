const pool = require("../db");

const hotelRouter = require("express").Router();

//Router to get all the hotels in the data base
hotelRouter.get('/', async (req, res) => {
    try {
        //get the average rating and number of reviews
        const result = await pool.query("SELECT hotels.hotelid,hotelname,Location,Price,COUNT(Rating) AS count, TRUNC(AVG(Rating),2) AS avg FROM  hotels LEFT JOIN reviews ON hotels.hotelid = reviews.hotelid GROUP BY hotelname,hotels.hotelid,location,price");
        res.json(result.rows).status(200)
    }
    catch (err) {
        console.log(err.message);
    }
})

hotelRouter.get('/:hotelid', async (req, res) => {
    const hotelid = req.params.hotelid
    try {
        //get the average rating and number of reviews
        const result = await pool.query("SELECT hotels.hotelid,hotelname,Location,Price,COUNT(Rating) AS count, TRUNC(AVG(Rating),2) AS avg FROM  hotels LEFT JOIN reviews ON hotels.hotelid = reviews.hotelid GROUP BY hotelname,hotels.hotelid,location,price HAVING hotels.hotelid=$1", [hotelid]);
        res.json(result.rows).status(200)
    }
    catch (err) {
        console.log(err.message);
    }
})

//Route to add a hotel to the data base
hotelRouter.post('/', async (req, res) => {
    const { hotelname, Location, Price } = req.body;
    try {
        const result = await pool.query("INSERT INTO hotels(hotelname,location,Price) VALUES ($1,$2,$3) RETURNING *", [hotelname, Location, Price])
        if (result.rows.length === 0) {
            res.json({ error: "server error" }).status(500)
        }
        else {
            res.json(result.rows).status(201)
        }
    }
    catch (err) {
        res.status(404);
        console.log(err.message);
    }
})

// Route to update a hotel in the data base
hotelRouter.put("/", async (req, res) => {
    const { hotelid, hotelname, Location, Price } = req.body;
    console.log(req.body)
    try {
        const result = await pool.query("UPDATE hotels SET hotelname=$1, Location =$2, Price =$3 WHERE hotelid=$4 RETURNING * ", [hotelname, Location, Price, hotelid])
        if (result.rows.length === 0) {
            res.json({ error: "server error" }).status(500)
        }
        else {
            res.json(result.rows).status(200)
        }
    }
    catch (err) {
        console.log(err.message)
    }
})

//Route to delete a hotel in the database
hotelRouter.delete("/:hotelid", async (req, res) => {
    const hotelid = req.params.hotelid
    try {
        const result = await pool.query("DELETE FROM hotels WHERE hotelid = $1 RETURNING *", [hotelid]);
        if (result.rows.length >= 1) {
            res.json({ msg: "delete successful" }).status(200)
        }
        else {
            res.json({ msg: "not found" }).status(404)
        }
    }
    catch (err) {
        console.log(err.message)
    }

})
module.exports = hotelRouter;