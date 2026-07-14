const fs = require('fs');
let content = fs.readFileSync('src/components/ParallaxHero.tsx', 'utf8');

content = content.replace(
  "const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(3));",
  "const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(10));"
);

content = content.replace(
  "      if (prods.length > 0) {\\n        setHeroItems(prods);\\n      }",
  "      const filtered = prods.filter(p => !p.title.toLowerCase().includes('carregamento duplo') && !p.title.toLowerCase().includes('base de'));\\n      if (filtered.length > 0) {\\n        setHeroItems(filtered.slice(0, 3));\\n      } else if (prods.length > 0) {\\n        setHeroItems(prods.slice(0, 3));\\n      }"
);

fs.writeFileSync('src/components/ParallaxHero.tsx', content);
