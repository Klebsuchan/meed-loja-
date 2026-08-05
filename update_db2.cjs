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
    if (data.name.toLowerCase().includes('vermelho')) {
      console.log('Found with vermelho:', data.name);
      promises.push(deleteDoc(doc(db, 'products', d.id)));
    }
  });

  await Promise.all(promises);
  process.exit(0);
}

run();
