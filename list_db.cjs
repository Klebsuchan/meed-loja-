const fs = require('fs');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } = require('firebase/firestore');
const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const snap = await getDocs(collection(db, 'products'));
  const promises = [];
  
  snap.forEach(d => {
    const data = d.data();
    console.log(data.name, data.price);
  });

  process.exit(0);
}

run();
