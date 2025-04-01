const express = require("express");
const router = express.Router();

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
    const response = await Event.findById(req.params.eventId).populate("organizer");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:eventId", verifyToken, verifyAdminRole, async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.eventId);

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
