const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');

const JWT_SECRET = process.env.JWT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const client = new OAuth2Client(googleClientId, googleClientSecret);

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

        try {
            // Check if email already exists
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ success: false, error: "Email already exists" });
            }
            
            /* to store hash password in db  */
            const salt = await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(req.body.password, salt);

            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })         
            const data = {
                user: {
                    id: req.body.email
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, error: "Server error" });
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

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try loggin with correct credentials" });
            }

            const data = {
                user:{
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET)
            return res.json({ success: true, authToken: authToken });

        } catch (error) {
            console.log(error)
            res.json({ success: false });
        }
    })

// Google OAuth login endpoint
router.post("/google-login", async (req, res) => {
    const { tokenId } = req.body;
    
    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: googleClientId
        });
        
        const payload = ticket.getPayload();
        const { email, name, picture, email_verified } = payload;
        
        // Ensure email is verified
        if (!email_verified) {
            return res.status(400).json({ success: false, error: "Email not verified with Google" });
        }
        
        // Check if user exists
        let user = await User.findOne({ email });
        
        if (!user) {
            // Create new user if not exists
            // Generate a random password for Google users
            const salt = await bcrypt.genSalt(10);
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const secPassword = await bcrypt.hash(randomPassword, salt);
            
            try {
                user = await User.create({
                    name: name,
                    email: email,
                    password: secPassword,
                    location: "Not specified" // Default location
                });
            } catch (error) {
                // If there's an error creating the user, it might be due to a race condition
                // Try to find the user again before failing
                user = await User.findOne({ email });
                if (!user) {
                    return res.status(500).json({ success: false, error: "Failed to create user" });
                }
            }
        }
        
        // Create JWT token (same as regular login)
        const data = {
            user: {
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({ success: true, authToken: authToken });
        
    } catch (error) {
        console.log("Google login error:", error);
        res.status(400).json({ success: false, error: "Google authentication failed" });
    }
});

module.exports = router;