const express = require("express");
const router = express.Router();
const nodemailer =  require("nodemailer");

const Event = require(`../models/Event.model`);
const { verifyToken, verifyAdminRole } = require("../middlewares/auth.middlewares");



router.post("/", verifyToken, verifyAdminRole, async (req, res, next) => {
  try {
    const created = await Event.create({
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description,
      organizer: req.payload._id,
      participants: req.body.participants,
    });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const response = await Event.find().populate("organizer");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:eventId", async (req, res, next) => {
  try {
    const response = await Event.findById(req.params.eventId).populate("organizer").populate("participants");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:eventId", verifyToken, verifyAdminRole, async (req, res, next) => {
  try {
    const result = await Event.findById(req.params.eventId).populate("participants");
    let emailsArr = result.participants.map((eachResult)=>{
      return(eachResult.email)
    })
    let stringEmails = emailsArr.join(",");
    
    await Event.findByIdAndDelete(req.params.eventId);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: stringEmails, // list of receivers
      subject: "Event cancelled", // Subject line
      text: "Due to unexpected circumstaces we have to cancel todays event.", // plain text body
      /*html: "<b>Hello world?</b>", // html body*/
    });
    console.log("Message sent: %s", info.messageId);

    res.status(202).json("Event deleted.");
  } catch (error) {
    next(error);
  }
});

router.put("/:eventId", verifyToken, verifyAdminRole, async (req, res, next) => {
  try {
    const response = await Event.findByIdAndUpdate(req.params.eventId, {
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      description: req.body.description,
    });
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

router.patch("/:eventId/participants", verifyToken, async (req, res, next) => {
  try {
    const eventObj = await Event.findById(req.params.eventId);
    
    let response;
    if(eventObj.participants.includes(req.payload._id)){
      response = await Event.findByIdAndUpdate(req.params.eventId, {
        $pull: {participants: req.payload._id},
      },{
        new:true //IMPRIME ACTUALIZADA LA INFORMACION
      });
    }else{
      response = await Event.findByIdAndUpdate(req.params.eventId, {
        $addToSet: {participants: req.payload._id},
      },{
        new:true
      });
    }
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
