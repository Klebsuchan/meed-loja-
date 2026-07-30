const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const promises = [];
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.name && data.name.includes('inpods')) {
      const newName = data.name.replace(/inpods/gi, 'Ipods');
      console.log(`Updating product ${docSnap.id}: ${data.name} -> ${newName}`);
      promises.push(updateDoc(doc(db, 'products', docSnap.id), { name: newName }));
    }
  });
  await Promise.all(promises);
  console.log('Finished updating');
  process.exit(0);
}
run();
