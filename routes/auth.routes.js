const User = require("../models/User.model");

const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {verifyToken, verifyAdminRole} = require("../middlewares/auth.middlewares")

//POST "/api/auth/signup" => ruta para crear documento de usuario
//Atento a prefijos
router.post("/signup", async (req, res, next) => {
  //Validaciones de Servidor
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({ errorMessage: "All fields are mandatory" });
    return;
  }

  if (name.length < 3) {
    res
      .status(400)
      .json({ errorMessage: "Name needs to be longer." });
    return;
  }

  const charRegex = /^[a-zA-Z0-9ñÑ]+$/gm;
  if (charRegex.test(name) === false) {
    res
      .status(400)
      .json({ errorMessage: "Name can´t include special characters." });
    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "Password needs to be stronger. Requiers 1 Mayus, 1 Minus, 1 Num and 8 characters in total.",
    });
    return;
  }

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (emailRegex.test(email) === false) {
    res
      .status(400)
      .json({ errorMessage: "Email needs to have a correct format." });
    return;
  }

  try {
    //que el email no se repita
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);

    if (foundUser !== null) {
      res
        .status(400)
        .json({ errorMessage: "This email is already in use." });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await User.create({
        name: name,
        email: email,
        password: hashPassword,
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res
        .status(400)
        .json({ errorMessage: "All fields are mandatory" });
      return;
    }
  
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (emailRegex.test(email) === false) {
      res
        .status(400)
        .json({ errorMessage: "Email needs to have a correct format." });
      return;
    }
  
    try {
      const foundUser = await User.findOne({ email: email });
  
      if (foundUser === null) {
        res
          .status(400)
          .json({ errorMessage: "User not found, try singing up." });
        return;
      }
  
      const isPasswordCorrect = await bcrypt.compare(
        password,
        foundUser.password
      );
      if (isPasswordCorrect === false) {
        res
          .status(400)
          .json({ errorMessage: "Incorrect password." });
        return;
      }
  
      const payload = {
          _id: foundUser._id,
          role: foundUser.role
      }
  
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm:"HS256", expiresIn: "7d" })
      res.status(200).json({authToken:authToken})
    } catch (error) {
      next(error);
    }
  });

router.get("/verify", verifyToken, (req, res) => {

    res.status(200).json({payload:req.payload})

})

module.exports = router;