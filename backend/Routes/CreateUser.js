const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_Secret;

router.post("/createuser", [
    // username must be an email
    body('email', 'Invalid Email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Invalid Password').isLength({ min: 5 })],
    async (req, res) => {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        /* to store hash  password in db  */
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })         
            const authToken = jwt.sign({ email: User.email },jwtSecret );
            return res.json({ success: true, authToken:authToken });
        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


router.post("/loginuser", [
    // username must be an email
    body('email', 'Invalid Email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Invalid Password').isLength({ min: 5 })],
    async (req, res) => {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;

        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try loggin with correct credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try loggin with correct credentials" });
            }

            const data = {
                user:{
                    id:userData.id
                }
            }

            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken:authToken });

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })


module.exports = router;