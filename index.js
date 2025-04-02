const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = process.env.PORT || 3001;

const serviceAccount = require('../gjchain/firebase-adminsdk.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const blockchainCollection = admin.firestore().collection('gjchain');

app.use(express.static('public'));

app.get('/chain', async (req, res) => {
    const snapshot = await blockchainCollection.orderBy('index').get();
    res.json(snapshot.docs.map(doc => doc.data()));
});

app.listen(port, () => console.log(`Explorer chạy tại http://localhost:${port}`));