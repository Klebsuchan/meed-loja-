const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const s = await getDocs(collection(db, 'products'));
  s.forEach(d => console.log(d.id, typeof d.data().price, d.data().price));
  process.exit(0);
}
run();
