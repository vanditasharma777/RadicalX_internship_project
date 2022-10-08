import express from "express";
import admin from "firebase-admin";
import multer from "multer";
import dotenv from "dotenv";
import saltedMd5 from 'salted-md5';
import path from "path";

import serviceAccount from "../internship-flow-firebase-adminsdk-9j1de-04bf2c7330.json" assert { type: "json" };

const app = express();
const router = express.Router();
dotenv.config();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET_URL
});
app.locals.bucket = admin.storage().bucket();
var bucket = admin.storage().bucket();
const db = admin.firestore();
const upload = multer({ storage: multer.memoryStorage() })

router.get("/", async (req, res) => {
    let internshipRef = db.collection('Internships');
    const internship = await internshipRef.get();
    const internships = [];
    internship.forEach(doc => {
        internships.push(doc.data());
    });
    res.status(200).json(internships);

});

router.post('/', upload.fields([{ name: 'introVideo', maxCount: 1 }, { name: 'internshipHero', maxCount: 1 }, { name: 'briefVideo', maxCount: 1 }, { name: 'mentorHero', maxCount: 1 }]), async (req, res) => {
    var name = saltedMd5(req.files['introVideo'][0].originalname, 'SUPER-S@LT!');
    var fileName = name + path.extname(req.files['introVideo'][0].originalname);
    await app.locals.bucket.file("videos/" + fileName).createWriteStream().end(req.files['introVideo'][0].buffer);

    const introVideoURL = await app.locals.bucket.file("videos/" + fileName).getSignedUrl({
        action: "read",
        expires: "03-09-2491",
    });

    name = saltedMd5(req.files['internshipHero'][0].originalname, 'SUPER-S@LT!');
    fileName = name + path.extname(req.files['internshipHero'][0].originalname);
    await app.locals.bucket.file("images/" + fileName).createWriteStream().end(req.files['internshipHero'][0].buffer);

    const internshipHeroURL = await app.locals.bucket.file("images/" + fileName).getSignedUrl({
        action: "read",
        expires: "03-09-2491",
    });

    name = saltedMd5(req.files['briefVideo'][0].originalname, 'SUPER-S@LT!');
    fileName = name + path.extname(req.files['briefVideo'][0].originalname);
    await app.locals.bucket.file("videos/" + fileName).createWriteStream().end(req.files['briefVideo'][0].buffer);

    const briefVideoURL = await app.locals.bucket.file("videos/" + fileName).getSignedUrl({
        action: "read",
        expires: "03-09-2491",
    });

    name = saltedMd5(req.files['mentorHero'][0].originalname, 'SUPER-S@LT!');
    fileName = name + path.extname(req.files['mentorHero'][0].originalname);
    await app.locals.bucket.file("images/" + fileName).createWriteStream().end(req.files['mentorHero'][0].buffer);

    const mentorHeroURL = await app.locals.bucket.file("images/" + fileName).getSignedUrl({
        action: "read",
        expires: "03-09-2491",
    });

    const newInternship = req.body;

    newInternship.isHidden === 'true' ? newInternship.isHidden = true : newInternship.isHidden = false;
    newInternship.isPrivate === 'true' ? newInternship.isPrivate = true : newInternship.isPrivate = false;
    newInternship.allowTextCopying === 'true' ? newInternship.allowTextCopying = true : newInternship.allowTextCopying = false;


    newInternship.introVideo = introVideoURL;
    newInternship.internshipHero = internshipHeroURL;
    newInternship.briefVideo = briefVideoURL;
    newInternship.mentorHero = mentorHeroURL;

    const internshipRef = db.collection('Internships');
    const internship = await internshipRef.add(newInternship);
    res.status(201).json(internship);

});
export default router;