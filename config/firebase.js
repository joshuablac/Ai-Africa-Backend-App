const admin = require('firebase-admin')
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const serviceKey  = path.join(__dirname, '../config/serviceKey.json')
if (fs.existsSync(serviceKey)) credential = require(serviceKey);
  else throw new Error('No Firebase service account provided. Set FIREBASE_SERVICE_ACCOUNT_BASE64 or put config/serviceAccountKey.json');
const serviceKeyBase64 = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential:admin.credential.cert({
        projectId: serviceKeyBase64.project_id,
        clientEmail: serviceKeyBase64.client_email,
        privateKey: serviceKeyBase64.private_key.replace(/\\n/g, '\n'),
    }),
       storageBucket:'ai-hypertension-app.appspot.com',
    databaseURL: 'https://ai-hypertension-app.firebaseio.com' 
})
const db = admin.firestore();
const bucket = admin.storage().bucket();
const auth = admin.auth()
const admins = {admin, db, bucket, auth}
console.log()
module.exports = admins;