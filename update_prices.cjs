const fs = require('fs');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');
const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const snap = await getDocs(collection(db, 'products'));
  const promises = [];
  
  snap.forEach(d => {
    const data = d.data();
    const name = data.name.toLowerCase();
    
    if (name.includes('apple watch')) {
      console.log('Updating price to 300 for:', data.name);
      promises.push(updateDoc(doc(db, 'products', d.id), { price: 300 }));
    } else if (name.includes('w29')) {
      console.log('Updating price to 250 for:', data.name);
      promises.push(updateDoc(doc(db, 'products', d.id), { price: 250 }));
    }
  });

  await Promise.all(promises);
  console.log('Prices updated successfully.');
  process.exit(0);
}

run();
