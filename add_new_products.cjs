const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

const products = [
  {
    name: 'Combo Smartwatch D20 + JBL',
    description: '✅Relógio Digital Smartwhat D20\n✅Cores do relógio: Preto, Rosa ou Branco\n✅Fone sem fio JBL: preto, rosa ou branco',
    price: '120,00',
    category: 'Acessórios',
    image: '/d20jbl.jpg',
    badge: 'Oferta',
    createdAt: serverTimestamp()
  },
  {
    name: 'Kit Chave Catraca 40 peças',
    description: 'Jogo De Soquetes Sextavados. Acompanha maleta para armazenar. Indicada para ajustes, regulagens e apertos.',
    price: '70,00',
    category: 'Acessórios',
    image: '/chavecatraca.jpg',
    badge: '',
    createdAt: serverTimestamp()
  },
  {
    name: 'Relógio Masculino Esportivo',
    description: '✅Fivela de silicone\n✅Diâmetro 42 mm\n✅Não é a prova D’água',
    price: '60,00',
    category: 'Acessórios',
    image: '/relogiomasculinoesportivo.jpg',
    badge: '',
    createdAt: serverTimestamp()
  },
  {
    name: 'Lixador de Pé Elétrico',
    description: '✅Portátil USB Recarregável\n✅Elimina calos e calosidades\n✅Dois níveis de Potência',
    price: '50,00',
    category: 'Eletroportáteis',
    image: '/lixadordepe.jpg',
    badge: '',
    createdAt: serverTimestamp()
  },
  {
    name: 'Aspirador de Pó Portátil',
    description: '✅Linha Premium\n✅USB Bateria Recarregável\n✅Sucção forte e limpeza completa',
    price: '65,00',
    category: 'Eletroportáteis',
    image: '/aspiradordepo.jpg',
    badge: '',
    createdAt: serverTimestamp()
  },
  {
    name: 'Relógio Feminino All-Match',
    description: '✅Pulseira em corinho\n✅Modelo delicado minimalista de Quartzo\n✅Acompanha caixinha preta',
    price: '45,00',
    category: 'Acessórios',
    image: '/relogioallmatch.jpg',
    badge: '',
    createdAt: serverTimestamp()
  }
];

async function run() {
  const promises = [];
  for (const product of products) {
    console.log('Adding product:', product.name);
    promises.push(addDoc(collection(db, 'products'), product));
  }
  await Promise.all(promises);
  console.log('Finished adding new products!');
  process.exit(0);
}
run();
