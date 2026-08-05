const fs = require('fs');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  await setDoc(doc(db, 'settings', 'admin'), {
    password: 'meed123online'
  });
  console.log('Settings seeded');
  process.exit(0);
}

run();
