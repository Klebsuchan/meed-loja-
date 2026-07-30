const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc, serverTimestamp } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const promises = [];
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (!data.createdAt) {
      console.log('Adding createdAt to', docSnap.id);
      promises.push(updateDoc(doc(db, 'products', docSnap.id), { createdAt: serverTimestamp() }));
    }
  });
  await Promise.all(promises);
  console.log('Finished updating timestamps');
  process.exit(0);
}
run();
