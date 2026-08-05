const fs = require('fs');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc } = require('firebase/firestore');
const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const snap = await getDocs(collection(db, 'products'));
  const promises = [];
  
  snap.forEach(d => {
    const data = d.data();
    if (data.name === 'Relógio Feminino' && (data.price === '20,00' || data.price === 20)) {
      console.log('Deleting:', data.name, data.price);
      promises.push(deleteDoc(doc(db, 'products', d.id)));
    }
  });

  await Promise.all(promises);
  process.exit(0);
}

run();
