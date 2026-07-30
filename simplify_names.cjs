const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

const replacements = {
  'Conjunto Relógio Feminino Quartzo + Pulseira': 'Conjunto Relógio Feminino',
  'Conjunto Relógio + Acessórios Feminino': 'Conjunto Relógio e Acessórios',
  'Mini Carregador automotivo': 'Carregador Automotivo Mini',
  'Cabo carregamento turbo IPhone': 'Cabo Turbo iPhone',
  'Carregador de Bateria Automotivo 12v 6A': 'Carregador Automotivo 12V',
  'Máquina para barbear e acabamentos': 'Máquina de Barbear',
  'Combo Smartwhat D20+ Fone Bluetooth': 'Combo Smartwatch D20 + Fone',
  'Combo Smartwatch + Fone tws': 'Combo Smartwatch + Fone',
  'Combo relógio + fone': 'Combo Relógio + Fone',
  'Carregador iPhone Completo': 'Carregador de iPhone',
  'Fone de ouvido Bluetooth Realfit F1': 'Fone Realfit F1',
  'Fone de ouvido Bluetooth Ipods': 'Fone Ipods Bluetooth',
  'Fone bluetooth ipods': 'Fone Ipods Bluetooth',
  'Fone de ouvido Bluetooth P47': 'Fone Bluetooth P47',
  'Fone de ouvido Bluetooth Y-50 (Preto)': 'Fone Bluetooth Y-50',
  'Fone de ouvido Bluetooth Y-50 (Branco)': 'Fone Bluetooth Y-50 Branco',
  'Fone Bluetooth airpods': 'AirPods Bluetooth',
  'Mini Parafusadeira Elétrica Recarregável': 'Parafusadeira Elétrica c/ Maleta',
  'Smartwatch T900 + 4 Pulseiras': 'Smartwatch T900 + 4 Pulseiras', // Keep? Maybe 'Smartwatch T900 + Pulseiras'
  'Kit Ferramentas 46 peças (Opção 2)': 'Kit Ferramentas 46 peças',
  'Umidificador e Difusor de ambientes': 'Umidificador e Difusor',
  'Luminária Projetor Infantil Galáxia': 'Luminária Projetor Galáxia',
  'Mini Projetor Astronauta Galáxia': 'Projetor Astronauta Galáxia',
  'Power Bank 20000mAh 22.5w Turbo': 'Power Bank 20000mAh Turbo',
  'Case protetora para Mi-Band': 'Case para Mi-Band',
  'Microfone de Lapela para Android Tipo-C': 'Microfone Lapela Tipo-C',
  'Base de Carregamento por Indução': 'Carregador por Indução',
  'Calibrador de Pneus Portátil': 'Calibrador de Pneus',
  'Mouse com fio USB LEHMOX': 'Mouse USB Lehmox',
  'Tomada automotiva 6 portas': 'Tomada Automotiva 6 Portas',
  'Fone Bluetooth Lenovo Pro': 'Fone Lenovo Pro',
  'Relógio Feminino simples': 'Relógio Feminino',
  'Smartwatch W29 Pró Séries 9': 'Smartwatch W29 Pro',
  'Relógio Smartwatch D20': 'Smartwatch D20',
  'Smartwatch T900 Ultra Big': 'Smartwatch T900 Ultra',
  'Fone Clip Bluetooth T75': 'Fone Clip T75',
  'Smart Band 5/7': 'Smart Band 5 e 7',
  'Relógio Smart Band 9': 'Smart Band 9',
  'Relógio Smart Band 7': 'Smart Band 7',
  'Luminária solar 100 leds': 'Luminária Solar 100 LEDs',
};

async function run() {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const promises = [];
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.name && replacements[data.name]) {
      const newName = replacements[data.name];
      console.log(`Updating product ${docSnap.id}: ${data.name} -> ${newName}`);
      promises.push(updateDoc(doc(db, 'products', docSnap.id), { name: newName }));
    }
  });
  await Promise.all(promises);
  console.log('Finished updating names');
  process.exit(0);
}
run();
