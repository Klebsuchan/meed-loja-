const fs = require('fs');
let content = fs.readFileSync('src/components/CartSidebar.tsx', 'utf8');

content = content.replace(
  'alert("Houve um erro ao processar seu pedido. Tente novamente.");',
  'setCouponError("Houve um erro ao processar seu pedido.");'
);

fs.writeFileSync('src/components/CartSidebar.tsx', content);
