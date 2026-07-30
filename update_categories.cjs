const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const promises = [];
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.category === 'Fones') {
      console.log('Updating product', docSnap.id);
      promises.push(updateDoc(doc(db, 'products', docSnap.id), { category: 'Áudio' }));
    }
  });
  await Promise.all(promises);
  console.log('Finished updating categories');
  process.exit(0);
}
run();
