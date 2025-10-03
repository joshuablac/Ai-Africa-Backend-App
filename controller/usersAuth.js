const {admin} = require('../config/firebase')
const multer = require('multer')
const express = require('express')
const register = async (req, res) => {
    const { name, email, password } = req.body
    if (name === '' || email === '' || password === '') {
        res.json({
            success: false,
            message: "missing necessary details please fill all the info"
        })
    }
    try {
        let existingUser;
    try {
      existingUser = await admin.auth().getUserByEmail(email);
    } catch (error) {
      if (error.code !== 'auth/user-not-found') {
        console.error("Error checking existing user:", error);
        return res.status(500).json({ success: false, message: "Server error" });
      }
    }

    if (existingUser) {
      console.log(">>> User already exists:", existingUser.email);
      return res.json({ success: false, message: "User already exists" });
    }
        else{
const add = await admin.auth().createUser({
            email, password, displayName: name, emailVerified: false
        })
        return res.status(201).json({
            success: true,
            uid: add.uid,
            message: 'User created successfully'
        });
        }
        
    }
    catch (error) {
        console.error("this is the logged error" + error)
    }
}

const logout = async (req, res) => {
    const { userId } = req.userId
    await admin.auth().revokeRefreshTokens(userId);
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    res.json({ success: true, message: 'Logout successful' });
};

// const login = async(req,res)=>{
//     const {email, password}= req.body
//     if(email === '' ||password === ''){
// res.json({
//     success:false,
//     message:"missing necessary details please fill all the info"
// })
// }       
module.exports = { register, logout }