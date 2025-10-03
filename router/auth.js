const Router = require('express').Router();
const { fileUpload, uploadMedicalRecord, aiResultsUpload } = require('../controller/userData');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const{register, logout}= require('../controller/usersAuth')
const verifyToken = require('../middleware/VeriftToken');
 Router.post('/upload',verifyToken, upload.single('file'), fileUpload);
 Router.post('/upload-medical-record',verifyToken , uploadMedicalRecord);
 Router.post('/upload-ai-results', verifyToken, aiResultsUpload);
Router.post('/register', register);
Router.post('/logout', logout);
module.exports = Router;
