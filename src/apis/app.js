const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const userRoutes = require('./views/userRoutes');
const { authMiddleware } = require('./auth/authMiddleWare');


const User = require('../models/users');

const port = 5500;

const app = express();
// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Signup route
app.post('/signup',async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists, try logging in" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwrd_hashed = await bcrypt.hash(password, salt);

    const newuser = await User.create({
      firstname,
      password: passwrd_hashed,
      lastname,
      role,
      email
    });

    res.status(201).json(newuser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sign-in route
app.post('/signin', async (req, res) => {
  const {email, password, remember_me} = req.body;
  
  console.log(email, password, remember_me);
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: "The user is not registered" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


// Other routes
app.use('/api/v1/users', userRoutes);
app.use('/api/chat', require('./ChatBootRoute/chatbootroute'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});