const fs = require('fs');
const file = 'src/CartContext.tsx';
let code = fs.readFileSync(file, 'utf8');

const target = `items: cart,`;
const replacement = `items: cart.map(item => ({
            id: item.id || Date.now(),
            name: item.name || 'Produto',
            price: item.price || 'R$ 0,00',
            image: item.image || '/logomeed.png',
            quantity: item.quantity || 1
          })),`;

code = code.replace(target, replacement);

const target2 = `return [...prev, { id: product.id, name: product.name || product.title, price: product.price, image: product.image, quantity: 1 }];`;
const replacement2 = `return [...prev, { 
        id: product.id || Date.now(), 
        name: product.name || product.title || 'Produto', 
        price: product.price || 'R$ 0,00', 
        image: product.image || '/logomeed.png', 
        quantity: 1 
      }];`;

code = code.replace(target2, replacement2);

fs.writeFileSync(file, code);
console.log('Patched');
