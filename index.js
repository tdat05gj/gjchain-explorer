const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = process.env.PORT || 3001;

let serviceAccount;
if (process.env.FIREBASE_ADMINSDK) {
    try {
        serviceAccount = JSON.parse(process.env.FIREBASE_ADMINSDK);
    } catch (error) {
        console.error('Error parsing FIREBASE_ADMINSDK:', error);
        throw new Error('Invalid FIREBASE_ADMINSDK environment variable');
    }
} else {
    console.log('FIREBASE_ADMINSDK not found, falling back to local file');
    serviceAccount = require('../gjchain/firebase-adminsdk.json');
}

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const blockchainCollection = admin.firestore().collection('gjchain');

app.use(express.static('public'));

app.get('/chain', async (req, res) => {
    const snapshot = await blockchainCollection.orderBy('index').get();
    res.json(snapshot.docs.map(doc => doc.data()));
});

app.listen(port, () => console.log(`Explorer chạy tại http://localhost:${port}`));
