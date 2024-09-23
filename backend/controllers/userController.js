// userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
    
  
      if (user) {
        // return res.status(400).json({ msg: 'User already exists' });
        return res.json({ error: 'Email already exists' });
      }
  
      user = new User({
        username,
        email,
        password: await bcrypt.hash(password, 10)
      });
      console.log('dddddddd')
      await user.save();
  
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET)
        console.log('user saved')
        res.json({ token, user, success:'user saved' });
    } catch (err) {
      console.error(err.message)
      res.json({ error: `Something went wrong ${err.message}` });
      // res.status(500).send('Server error')
    }
  }

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
    
        const user = await User.findOne({ email });
    
        if (!user) {
            // return res.status(400).json({ message: 'User not found' });
            return res.json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
     
        if (!isMatch) {
            // return res.status(400).json({ message: 'incorrect password' });
         console.log('not match')
            return res.json({ error: 'incorrect password' });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    
    
        res.json({ token, user, success:'signed in' });
    } catch (error) {
        res.json({ error: 'Error logging in' });
        // res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports = {signup , login}