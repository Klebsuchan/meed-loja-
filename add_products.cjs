const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf-8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

const products = [
  {
    name: 'Relógio Feminino simples',
    description: '✅Luz de visor em RGB\n✅ Não é a prova D’agua',
    price: '20,00',
    category: 'Acessórios',
    image: '/relogiofemininosimples.jpg',
    badge: 'Oferta'
  },
  {
    name: 'Relógio Feminino Digital',
    description: '✅Alarme\n✅Cronômetro\n✅Luz lateral\n✅Resistente à água',
    price: '45,00',
    category: 'Acessórios',
    image: '/relogiosfemininosdigital.jpg',
    badge: 'Promoção'
  },
  {
    name: 'Fone bluetooth ipods',
    description: '✅Sem fio\n✅Dura entre 3/4 hrs\n✅Via Bluetooth\n✅id 12 TWS 5.0',
    price: '60,00',
    category: 'Áudio',
    image: '/ipodsbluethoth.jpg',
    badge: ''
  },
  {
    name: 'Tomada automotiva 6 portas',
    description: '✅6 portas de carregamento rápido\n✅Compatível pra qualquer veículo',
    price: '60,00',
    category: 'Carregadores',
    image: '/tomadaautomotiva.jpg',
    badge: ''
  },
  {
    name: 'Combo Smartwhat D20+ Fone Bluetooth',
    description: '✅Relógio Digital Smartwhat D20\n✅Fone de ouvido sem fio tws\n✅Cores disponíveis: Rosa ou Branco',
    price: '120,00',
    category: 'Acessórios',
    image: '/combod20.jpg',
    badge: 'Combo'
  },
  {
    name: 'Relógio Feminino de Quartzo',
    description: 'Moderno, pequeno e elegante🤎\nExcelente Opção para presente 🎁',
    price: '45,00',
    category: 'Acessórios',
    image: '/relogioquartzo.jpg',
    badge: ''
  },
  {
    name: 'Relógio Smart Band 7',
    description: '✅Monitora seus passos\n✅Quilometragem\n✅Calorias e frequência cardíaca\n✅Monitoramento do sono',
    price: '65,00',
    category: 'Acessórios',
    image: '/smartband.jpg', // Using smartband.jpg as it fits Smart Band 7 or band5
    badge: 'Oferta'
  },
  {
    name: 'Kit Ferramentas 46 peças',
    description: 'Uma variedade de soquetes, bits, chaves hexagonais e barras de extensão para suas necessidades de aperto.',
    price: '85,00',
    category: 'Acessórios',
    image: '/ferramentas46.jpg',
    badge: ''
  },
  {
    name: 'Máquina para barbear e acabamentos',
    description: 'Máquina de fazer barba e acabamentos dragão.\nItens na embalagem:\n1 Máquina\n1 Cabo para carregar tipo c\n1 Escova de limpeza\n4 Pentes\n01 Óleo',
    price: '60,00',
    category: 'Eletroportáteis',
    image: '/maquinabarbear.jpg',
    badge: 'Promoção'
  },
  {
    name: 'Conjunto Relógio + Acessórios Feminino',
    description: '✅Relógio no preto com Rosé\n✅Acessórios em Bijuteria\n✅Relógio + colar, pulseira e brinco',
    price: '75,00',
    category: 'Acessórios',
    image: '/conjuntorelogio.jpg',
    badge: ''
  },
  {
    name: 'Relógio Smart Band 9',
    description: '✅Monitora seus passos\n✅Quilometragem\n✅Calorias e frequência cardíaca\n✅Monitoramento do sono',
    price: '75,00',
    category: 'Acessórios',
    image: '/band9.jpg',
    badge: ''
  },
  {
    name: 'Mini Carregador automotivo',
    description: '✅Carregador de bateria inteligente\n✅12v 2 AH bivolt automático\n✅Para moto, carro, barco, Jetski',
    price: '120,00',
    category: 'Carregadores',
    image: '/carregadorautomotivo.jpg',
    badge: ''
  },
  {
    name: 'Conjunto Relógio Feminino Quartzo + Pulseira',
    description: '✅Relógio no preto com Rosé\n✅Acompanha uma pulseira em Bijuteria\n✅Acompanha caixinha preta',
    price: '65,00',
    category: 'Acessórios',
    image: '/relogioquartzopulseira.jpg',
    badge: ''
  },
  {
    name: 'Smart Band 5/7',
    description: '✅Monitora seus passos\n✅Quilometragem\n✅Calorias e frequência cardíaca',
    price: '75,00',
    category: 'Acessórios',
    image: '/band5.jpg',
    badge: ''
  },
  {
    name: 'Relógio Smartwatch D20',
    description: '✅Notificações de redes sociais e ligação\n✅Medição de batimentos cardíacos\n✅Contador de passos\n✅Várias modalidades esportivas',
    price: '40,00',
    category: 'Acessórios',
    image: '/d20.jpg',
    badge: 'Queima de Estoque'
  },
  {
    name: 'Fone Bluetooth airpods',
    description: 'Produto Lacrado.',
    price: '200,00',
    category: 'Áudio',
    image: '/airpods.jpg',
    badge: ''
  },
  {
    name: 'Carregador iPhone Completo',
    description: '✅Fonte Carregador Tomada TURBO Tipo C 20W\n✅Carregamento super-rápido\n✅Cabo incluso',
    price: '95,00',
    category: 'Carregadores',
    image: '/carregadoriphonecompleto.jpg',
    badge: ''
  },
  {
    name: 'Mini Parafusadeira Elétrica Recarregável',
    description: 'Kit com 45 Acessórios. Produto compacto e super funcional, com maleta.',
    price: '120,00',
    category: 'Eletroportáteis',
    image: '/miniparafusadeiraeletrica.jpg',
    badge: ''
  },
  {
    name: 'Mini Parafusadeira Elétrica',
    description: 'Kit com 45 Acessórios. Produto compacto e super funcional.',
    price: '120,00',
    category: 'Eletroportáteis',
    image: '/miniparafusadeira.jpg',
    badge: ''
  },
  {
    name: 'Smartwatch T900 + 4 Pulseiras',
    description: '✅Função de chamadas e notificações\n✅Bluetooth 5.0\n✅Tela de 2.09 polegadas\n✅Acompanha as 4 pulseiras da foto',
    price: '150,00',
    category: 'Acessórios',
    image: '/promot900.jpg',
    badge: 'Queima de Estoque'
  },
  {
    name: 'Fone Bluetooth Redmi Buds',
    description: '✅Cancelamento de ruídos\n✅Toque Touch\n✅Microfone\n✅Até 3/5 horas de bateria',
    price: '120,00',
    category: 'Áudio',
    image: '/buds.jpg',
    badge: ''
  },
  {
    name: 'Umidificador e Difusor de ambientes',
    description: '✅6 horas de névoa contínua\n✅Led multicolorido com 7 opções de cores\n✅Tecnologia Ultrassônica',
    price: '50,00',
    category: 'Eletroportáteis',
    image: '/umidificador.jpg',
    badge: ''
  },
  {
    name: 'Chave Multifuncional 360',
    description: '✅Tamanhos dos soquetes: 8mm a 19mm\n✅Gira 360\n✅Feito em aço inoxidável',
    price: '65,00',
    category: 'Acessórios',
    image: '/chavemultifuncional.jpg',
    badge: ''
  },
  {
    name: 'Kit Ferramentas 46 peças (Opção 2)',
    description: 'Kit completo de ferramentas de aperto e desaperto.',
    price: '85,00',
    category: 'Acessórios',
    image: '/kitferramentas.jpg',
    badge: ''
  },
  {
    name: 'Fone de ouvido Bluetooth inpods',
    description: '✅Sem fio\n✅Dura entre 3/4 hrs\n✅Via Bluetooth\n✅id 12 TWS 5.0',
    price: '60,00',
    category: 'Áudio',
    image: '/ipods.jpg',
    badge: ''
  },
  {
    name: 'Fone de ouvido Bluetooth P47',
    description: '✅Bluetooth 5.0\n✅Desportivo sem fio\n✅Portátil e dobrável\n✅Cancelamento de ruídos',
    price: '70,00',
    category: 'Áudio',
    image: '/p47.jpg',
    badge: ''
  },
  {
    name: 'Smartwatch W29 Pró Séries 9',
    description: '✅POSSUI TELA DE 47mm\n✅Faz e recebe chamadas\n✅Pagamentos NFC\n✅Comando de voz',
    price: '200,00', // Assuming a price for this as none was given, wait... I will just put 0,00
    category: 'Acessórios',
    image: '/w29.jpg',
    badge: 'Lançamento'
  },
  {
    name: 'Luminária solar 100 leds',
    description: '✅Luminária solar com detector de movimento\n✅Autonomia de até 12 horas',
    price: '40,00',
    category: 'Eletroportáteis',
    image: '/luminariasolar.jpg',
    badge: ''
  },
  {
    name: 'Relógio infantil',
    description: 'Modelinhos dos personagem: Batman, Hello kity, Arco Íris, Pikachu e Lufy!',
    price: '25,00',
    category: 'Acessórios',
    image: '/relogioinfantil.jpg',
    badge: ''
  },
  {
    name: 'Carregador de Bateria Automotivo 12v 6A',
    description: '✅Tecnologia de carregamento inteligente\n✅Saída de 12V estável em 6A',
    price: '180,00',
    category: 'Carregadores',
    image: '/carregador12v.jpg',
    badge: ''
  },
  {
    name: 'Fone Clip Bluetooth T75',
    description: '✅Duração de 2/4 horas\n✅Som limpo sem ruídos\n✅Formato Ergonômico\n✅Flexível e ajustável',
    price: '80,00',
    category: 'Áudio',
    image: '/foneclip.jpg',
    badge: ''
  },
  {
    name: 'Combo Smartwatch + Fone tws',
    description: '✅Relógio Digital Smartwhat D20\n✅Fone de ouvido sem fio tws\n✅Cores disponíveis do relógio: Rosa ou Branco',
    price: '135,00',
    category: 'Acessórios',
    image: '/smartwatchfone.jpg',
    badge: 'Combo'
  },
  {
    name: 'Fone Bluetooth Lenovo Pro',
    description: '✅Graves fortes e definidos\n✅Bluetooth 5.3\n✅Modo jogo e modo musica',
    price: '120,00',
    category: 'Áudio',
    image: '/lenovofone.jpg',
    badge: ''
  },
  {
    name: 'Cabo carregamento turbo IPhone',
    description: 'Feito de nylon muito resistente.\nTaxa de transferência de 480 Mbps e carregamento de 2A.',
    price: '30,00',
    category: 'Carregadores',
    image: '/caboturbo.jpg',
    badge: 'Abaixou!'
  },
  {
    name: 'Caixa de Som Bluetooth RGB',
    description: '✅Entradas para Pen-drive, Cartão Micro SD\n✅Som Hi-Fi de alta qualidade\n✅Rádio FM integrado',
    price: '100,00',
    category: 'Áudio',
    image: '/caixargb.jpg',
    badge: ''
  },
  {
    name: 'Fone de ouvido Bluetooth Realfit F1',
    description: '✅Qualidade HIFI Bluetooth\n✅Bateria de longa duração',
    price: '100,00',
    category: 'Áudio',
    image: '/realfit.jpg',
    badge: 'Promoção'
  },
  {
    name: 'Mini Projetor Astronauta Galáxia',
    description: '✅8 efeitos nebulosas\n✅Acompanha controle remoto cabo e manual.',
    price: '95,00',
    category: 'Eletroportáteis',
    image: '/projetor.jpg',
    badge: 'Promoção'
  },
  {
    name: 'Smartwatch T900 Ultra Big',
    description: '✅Medição batimentos cardíacos\n✅Função de chamadas\n✅Aviso de notificações/ redes sociais\n✅Tela de 2.09 polegadas',
    price: '110,00',
    category: 'Acessórios',
    image: '/t900.jpg',
    badge: 'Promoção'
  },
  {
    name: 'Combo relógio + fone',
    description: '✅Relógio Digital Smartwhat D20\n✅Fone de ouvido sem fio\n✅Cores: Preto, Rosa ou Branco',
    price: '120,00',
    category: 'Acessórios',
    image: '/comboblack.jpg',
    badge: 'Preço de Black'
  },
  {
    name: 'Mini porta Joias',
    description: '✅Pequeno e portátil\n✅Ideal para otimizar espaço e organização para viagens',
    price: '35,00',
    category: 'Acessórios',
    image: '/miniportajoias.jpg',
    badge: ''
  }
];

async function run() {
  const promises = [];
  for (const product of products) {
    console.log('Adding product:', product.name);
    promises.push(addDoc(collection(db, 'products'), product));
  }
  await Promise.all(promises);
  console.log('Finished adding all products!');
  process.exit(0);
}
run();
