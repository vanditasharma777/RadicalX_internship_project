import express from "express";
import admin from "firebase-admin";

import serviceAccount from "../internship-flow-firebase-adminsdk-9j1de-04bf2c7330.json" assert { type: "json" };

const router = express.Router();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

router.get("/", async (req, res) => {
    let internshipRef = db.collection('Internships');
    const internship = await internshipRef.get();
    const internships = [];
    internship.forEach(doc => {
        internships.push(doc.data());
    });
    res.status(200).json(internships);

});

export default router;