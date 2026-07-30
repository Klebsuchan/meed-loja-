const fs = require('fs');

function patchFile(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  const target = "`R$ ${Number(data.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`";
  const replacement = "typeof data.price === 'string' ? (data.price.includes('R$') ? data.price : `R$ ${data.price}`) : `R$ ${Number(data.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`";

  if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync(file, code);
    console.log(`Patched ${file}`);
  } else {
    console.log(`Target not found in ${file}`);
  }
}

patchFile('src/components/ParallaxHero.tsx');
patchFile('src/components/ProductCatalog.tsx');
