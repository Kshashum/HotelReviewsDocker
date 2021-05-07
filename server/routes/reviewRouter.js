const pool = require("../db");
const validator = require("../middleware/validate")
const reviewRouter = require("express").Router();

//Router to get all the reviews  in the data base
reviewRouter.get('/:hotelid', async (req, res) => {
    const hotelid = req.params.hotelid
    try {
        const result = await pool.query("SELECT * FROM  reviews WHERE hotelid= $1", [hotelid]);
        res.json(result.rows).status(200)
    }
    catch (err) {
        console.log(err.message);
    }
})

//Route to add a review to the data base
reviewRouter.post('/', validator, async (req, res) => {
    const { userid, hotelid, review, rating, name } = req.body;
    try {
        const result = await pool.query("INSERT INTO reviews (userid,hotelid,review,rating,name) VALUES ($1,$2,$3,$4,$5) RETURNING *", [userid, hotelid, review, rating, name])
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

// Route to update a review in the data base
reviewRouter.put("/", validator, async (req, res) => {
    const { userid, hotelid, review, rating, reviewid } = req.body;
    try {
        const result = await pool.query("UPDATE reviews  SET review=$3, rating=$4 WHERE userid=$1 AND hotelid =$2 and reviewid=$5 RETURNING * ", [userid, hotelid, review, rating, reviewid])
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

//Route to delete a review in the database
reviewRouter.delete("/", validator, async (req, res) => {
    const { reviewid, userid } = req.body;
    try {
        const result = await pool.query("DELETE FROM reviews  WHERE reviewid = $1 and userid=$2 RETURNING *", [reviewid, userid]);
        if (result.rows.length === 1) {
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
module.exports = reviewRouter;