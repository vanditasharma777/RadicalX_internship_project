import express from 'express';
import dotenv from 'dotenv';
import admin from "firebase-admin";
import serviceAccount from "./internship-flow-firebase-adminsdk-9j1de-04bf2c7330.json" assert { type: "json" };


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
// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

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


app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running on port ${process.env.PORT || 8000}`);
});