const express = require('express')
const { admin } = require("./config/firebase");
require('dotenv').config()
const Router = require('./router/auth');
console.log(process.env.FIREBASE_PROJECT_ID)
console.log(">>>line 4" + Router)
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000;
app.use(cors())
app.use(express.json())
app.use('/api', Router)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on http://localhost:${PORT}`);
  });
}

//export app for Vercel
module.exports = app;