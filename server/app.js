import express from 'express';
import dotenv from 'dotenv';
import admin from "firebase-admin";

import internshipRoute from "./routes/internship.js";

dotenv.config();
const app = express();
app.use(express.json());
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
//read from firestore
// let internshipRef = db.collection('Internships');
// internshipRef.get().then(snapshot => {
//     snapshot.forEach(doc => {
//         console.log(doc.id, '=>', doc.data());
//     });
// }).catch(err => {
//     console.log('Error getting documents', err);
// });
//write to firestore
// const data = {
//     id: 4,
//     name: 'Blockchain Developemt',
//     category: 'Development'
// };

// db.collection('Internships').doc(data.id.toString()).set(data);

app.use("/api/internships", internshipRoute);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`);
});