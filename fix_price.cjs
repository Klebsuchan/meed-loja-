const fs = require('fs');

function fix(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Regex to match the broken price line and replace it
  // price: typeof data.price === 'string' ? (data.price.includes('R        };
  
  code = code.replace(/price:\s+typeof data\.price === 'string'\s*\?\s*\(data\.price\.includes\('R[\s\S]*?\};/g, 
`price: typeof data.price === 'string' ? (data.price.includes('R$') ? data.price : \`R$ \${data.price}\`) : \`R$ \${Number(data.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`
        };`);

  fs.writeFileSync(file, code);
}

fix('src/components/ProductCatalog.tsx');
fix('src/components/SearchModal.tsx');
fix('src/components/ParallaxHero.tsx');

