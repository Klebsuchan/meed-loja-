const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, setDoc, doc, serverTimestamp } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

const products = [
  { 
    name: 'Base de Carregamento por Indução', 
    category: 'Carregadores', 
    price: '75,00', 
    description: 'Carregador por indução 20W. Compatível com iPhone 8 ao 15+, Samsung S6 a S24+, e outros. Produto só funciona em aparelhos com tecnologia QI sem fio.',
    image: '/baseindução.jpg'
  },
  { 
    name: 'Calibrador de Pneus Portátil', 
    category: 'Acessórios', 
    price: '160,00', 
    description: 'Modelo Analógico com fio. Compressor sem bateria, calibra rapidamente. Alimentação pelo Acendedor 12v do carro.',
    image: '/calibradorpneus.jpg'
  },
  { 
    name: 'Microfone de Lapela para Android Tipo-C', 
    category: 'Áudio', 
    price: '80,00', 
    description: 'Plug & Play, sem necessidade de app. Conexão 2.4GHz, redução de ruído, alcance de 20 metros. Autonomia de 6 horas.',
    image: '/microfoneandroidtipoc.jpg'
  },
  { 
    name: 'Power Bank 20000mAh 22.5w Turbo', 
    category: 'Carregadores', 
    price: '160,00', 
    description: 'Carregamento Ultra Rápido (22.5W). 20.000mAh. 3 Saídas para carregamento simultâneo (2 USB, 1 USB-C).',
    image: '/powerbank20000.jpg'
  },
  { 
    name: 'Mini Lanterna Tática Portátil', 
    category: 'Acessórios', 
    price: '35,00', 
    description: 'LED frontal XPE + lateral COB (super brilhante). 3 modos de uso, zoom telescópico, USB recarregável. 300 lúmens.',
    image: '/lanternatatica.jpg'
  },
  { 
    name: 'Mouse com fio USB LEHMOX', 
    category: 'Periféricos', 
    price: '35,00', 
    description: 'Alta precisão (1200 DPI). Conexão USB Plug & Play. Design confortável, 3 botões com scroll.',
    image: '/mousefiolehmox.jpg'
  },
  { 
    name: 'Cabo iPhone 15/16/17 (60W)', 
    category: 'Carregadores', 
    price: '60,00', 
    description: 'Cabo original para iPhone a partir do 15. Carregamento rápido 60W, revestimento trançado premium.',
    image: '/caboiphone15.jpg'
  },
  { 
    name: 'Fone de ouvido Bluetooth Y-50 (Preto)', 
    category: 'Fones', 
    price: '60,00', 
    description: 'Fone de ouvido Bluetooth Y-50. Duração 3/5h, emparelhamento automático, design ergonômico ideal para esportes.',
    image: '/foney50.jpg'
  },
  { 
    name: 'Luminária Projetor Infantil Galáxia', 
    category: 'Eletroportáteis', 
    price: '80,00', 
    description: 'Projetor de Estrelas Cosmos. 9 modos de cores, giratório. Funciona via USB ou 3 pilhas AA.',
    image: '/luminariainfantil.jpg'
  },
  { 
    name: 'Smartwatch D20 (Queima de Estoque)', 
    category: 'Acessórios', 
    price: '40,00', 
    description: 'Notificações de redes, medição de batimentos, esportes, controle de câmera. Cores: Rosa, branco, preto.',
    image: '/relogioqueimaestoque.jpg'
  },
  { 
    name: 'Relógio Masculino Dourado', 
    category: 'Acessórios', 
    price: '85,00', 
    description: 'Relógio elegante dourado, resistente à água. Botão lateral funcional.',
    image: '/relogiodourado.jpg'
  },
  { 
    name: 'Fone de ouvido Bluetooth Y-50 (Branco)', 
    category: 'Fones', 
    price: '60,00', 
    description: 'Fone de ouvido Bluetooth Y-50. Emparelhamento automático, design portátil e confortável.',
    image: '/foney50branco.jpg'
  },
  { 
    name: 'Case protetora para Mi-Band', 
    category: 'Acessórios', 
    price: '30,00', 
    description: 'Case protetora para Xiaomi Mi Band 7/6/5/4/3. Evita arranhões e solavancos.',
    image: '/caseprotetoramiband.jpg'
  }
];

async function run() {
  try {
    const prods = await getDocs(collection(db, 'products'));
    const deletePromises = [];
    prods.forEach(d => {
      deletePromises.push(deleteDoc(d.ref));
    });
    await Promise.all(deletePromises);
    console.log('Deleted old products');

    for (const p of products) {
      await setDoc(doc(collection(db, 'products')), {
        ...p,
        createdAt: serverTimestamp()
      });
    }
    console.log('Added new products');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
run();
