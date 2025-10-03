const {db } = require('../config/firebase');

const fileUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, message: 'No file uploaded' });
        }
        const file = req.file;
        const filename = `uploads/${Date.now()}_${req.file.originalname}`
        const saveFile = admin.storage().bucket();
        await saveFile.upload(req.file.path, { //the first parameter is the path to the file on your server the second is the options object which contains metadata about the file and where to store it in the bucket
            destination:filename,
            metadata: { contentType: file.mimetype },
        });
        let publicUrl;
      await saveFile.file(filename).getSignedUrl({
        action: 'read',
        expires: '03-01-2500' // Adjust expiration as needed
      })
        .then(signedUrls => {
            publicUrl = signedUrls[0];
            console.log(signedUrls[0])
        });
        res.status(200).json({ success: true, fileUrl: publicUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
//medical record upload
const uploadMedicalRecord = async (req, res) => {
    try{
const record = {
    ...req.body,
    userId: req.user
  };
  await db
    .collection("users-medical-records")
    .doc(req.user)
    .set(record, { merge: true }); // add or overwrite

  res.json({ success: true });
    }
    catch(error){
        console.error('Error uploading medical record:', error);
        res.json({ success: false, message: 'Server error' });
    }
};
const aiResultsUpload = async (req, res) => {
    try {
    const recordRef = db
      .collection("users-medical-records")
      .doc(userId)
      .collection("reports")
      .doc();

    await recordRef.set({
      fileUrl: `https://storage.googleapis.com/${bucket.name}/${fileName}`,
      report,
      createdAt: new Date(),
    });

    // 5. Send response
    res.json({ success: true, report, fileUrl: `https://storage.googleapis.com/${bucket.name}/${fileName}` });

  } catch (error) {
    console.error("Error uploading medical file:", error);
    res.status(500).json({ error: "Failed to process medical file" });
  }
};
module.exports = { fileUpload, uploadMedicalRecord, aiResultsUpload };