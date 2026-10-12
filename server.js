const Member = require("./models/Member");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.get("/",async(req,res) => {
    const members = await Member.find();
    res.render("index",{
        members: members
    });
});
app.get("/search", async (req, res) => {

    const clubName = req.query.clubName;
    const points = Number(req.query.points);

    const members = await Member.find({
        clubName: clubName,
        points: { $gt: points }
    });

    res.render("index", {
        members: members
    });
});
app.get("/member", async (req, res) => {

    const memberId = req.query.memberId;

    const member = await Member.findOne({
        memberId: memberId
    });

    res.render("index", {
        members: member ? [member] : []
    });
});
app.get("/selected", async (req, res) => {

    const members = await Member.find();

    res.render("selected", {
        members: members
    });
});
app.post("/update", async (req, res) => {

    const memberId = req.body.memberId;
    const role = req.body.role;
    const points = Number(req.body.points);

    await Member.findOneAndUpdate(
        { memberId: memberId },
        {
            role: role,
            points: points
        }
    );

    res.redirect("/");
});
mongoose
.connect(process.env.MONGO_URI)
.then( () => {
    console.log("MongoDB connected successfully!");
    app.listen(2000,() => {
        console.log("Server running at http://localhost:2000")
    });
})
.catch((error) => {
    console.log("MOngoDB connection failed:");
    console.log(error);
});