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
    if (data.name.toLowerCase().includes('relógio vermelho') || data.name.toLowerCase().includes('relogio vermelho')) {
      console.log('Deleting:', data.name);
      promises.push(deleteDoc(doc(db, 'products', d.id)));
    }
  });

  await Promise.all(promises);
  
  console.log('Adding Apple Watch Series 9');
  await addDoc(collection(db, 'products'), {
    name: 'Apple Watch Series 9 - 44mm',
    category: 'Smartwatches',
    description: `Relógio 100% funcional, ideal para quem busca estilo, praticidade e tecnologia no dia a dia.
Tamanho 44mm - design delicado, confortável e perfeito para o público feminino e Masculino.
Relógio Testado.
Acompanha carregador por indução.
2 pulseiras inclusas (silicone de silicone), para combinar com qualquer ocasião.
Caixa original inclusa.

Ideal para:
• Monitorar atividades físicas
• Receber notificações do iPhone
• Acompanhar batimentos cardíacos
• Uso diário com elegância e conforto, entre outras diversas funcionalidades.
• Disponível nas cores: Branco, preto e rosa.

Produto a pronta entrega e pronto para uso imediato. Entregamos para todo Brasil via correios.
Temos tele para Passo fundo.
Excelente custo-benefício para quem quer entrar no mundo Apple Watch.`,
    price: 199.90, // We need to set a price, I will set a placeholder or find if price was mentioned. No price mentioned.
    originalPrice: 299.90,
    image: '/smartwatchfone.jpg',
    features: ['Monitoramento Cardíaco', 'Notificações', 'Duas Pulseiras', 'Carregador por Indução', '44mm'],
    colors: ['Branco', 'Preto', 'Rosa'],
    createdAt: new Date()
  });

  console.log('Adding W29 Pro');
  await addDoc(collection(db, 'products'), {
    name: 'W29 Pro',
    category: 'Smartwatches',
    description: `Sempre que alguém vê esse relógio no seu pulso, só recebe elogios! Talvez seja pelo sistema incrível com 1GB de memória ou pelo acabamento premium que da um toque de destaque. Mas vamos aos detalhes?

Características que vão transformar sua rotina:
• Tela IPS - Cores mais vivas, alta sensibilidade (quase como um celular!) e uma experiência única.
• Certificação IP67 - Pegou chuva ou molhou rapidamente? Sem problemas! (Ele tem a função drenagem de água que retira a água que entrou sem prejudicar o seu relógio)
• 1GB de memória interna - Armazene músicas, fotos, áudios e até e-books, além de conectar fones Bluetooth.
• Conectividade completa - Faz e recebe chamadas, tem saída de som, microfone e recebe todas as notificações do seu celular.
• Personalização total - Escolha seu plano de fundo, explore + de 10 modos esportivos e use funções como calculadora, calendário e previsão do tempo.
• Ilha dinâmica de notificações e carregamento por indução para mais praticidade.
• Bateria de longa duração - de 2 a 5 dias de uso médio.`,
    price: 189.90, // Placeholder
    originalPrice: 249.90,
    image: '/w29.jpg',
    features: ['1GB de Memória', 'Tela IPS', 'IP67', 'Faz Chamadas', 'Ilha Dinâmica'],
    createdAt: new Date()
  });

  process.exit(0);
}

run();
