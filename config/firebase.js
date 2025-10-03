const admin = require('firebase-admin')
const fs = require('fs')
const path = require('path')
const serviceKey  = path.join(__dirname, '../config/serviceKey.json')
if (fs.existsSync(serviceKey)) credential = require(serviceKey);
  else throw new Error('No Firebase service account provided. Set FIREBASE_SERVICE_ACCOUNT_BASE64 or put config/serviceAccountKey.json');
admin.initializeApp({
    credential:admin.credential.cert(serviceKey),
    storageBucket:'ai-hypertension-app.appspot.com',
    databaseURL: 'https://ai-hypertension-app.firebaseio.com' 
})
const db = admin.firestore();
const bucket = admin.storage().bucket();
const auth = admin.auth()
const admins = {admin, db, bucket, auth}
console.log()
module.exports = admins;