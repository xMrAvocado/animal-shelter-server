const express = require("express");
const router = express.Router();

const Animal = require(`../models/Animal.model`);

router.post("/", async (req, res, next) => {
  try {
    const created = await Animal.create({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      age: req.body.age,
      gender: req.body.gender,
      race: req.body.race,
      img: req.body.img,
      interested: req.body.interested,
      creator: req.body.creator,
    });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const response = await Animal.find();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:animalId", async (req, res, next) => {
  try {
    const response = await Animal.findById(req.params.animalId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/:animalId", async (req, res, next) => {
  try {
    await Animal.findByIdAndDelete(req.params.animalId);

    res.status(202).json("Animal deleted.");
  } catch (error) {
    next(error);
  }
});

router.put("/:animalId", async (req, res, next) => {
  try {
    const response = await Animal.findByIdAndUpdate(req.params.animalId, {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      age: req.body.age,
      gender: req.body.gender,
      race: req.body.race,
      img: req.body.img,
      interested: req.body.interested,
      creator: req.body.creator,
    });
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
