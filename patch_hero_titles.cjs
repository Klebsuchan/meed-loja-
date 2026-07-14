const fs = require('fs');
let content = fs.readFileSync('src/components/ParallaxHero.tsx', 'utf8');

content = content.replace(
  /const unsubscribe = onSnapshot[\s\S]*?}\);/m,
  `const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const prods = querySnapshot.docs.map(doc => {
        const data = doc.data();
        let rawTitle = data.name || data.title || "Produto";
        
        // Encurtando nomes
        if (rawTitle.toLowerCase().includes('carregamento')) {
          rawTitle = "Base Dupla";
        } else if (rawTitle.length > 16) {
          // Se tiver mais de 16 caracteres, tenta pegar as primeiras palavras
          const words = rawTitle.split(' ');
          if (words.length > 2) {
             rawTitle = words.slice(0, 2).join(' ');
          } else {
             rawTitle = rawTitle.substring(0, 16);
          }
        }
        
        return {
          id: doc.id,
          ...data,
          title: rawTitle,
          subtitle: data.category || "Destaque",
          price: \`R$ \${Number(data.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\`,
          color: "from-orange-600 to-amber-600",
          glow: "shadow-[0_0_80px_rgba(221,113,28,0.4)]"
        };
      });
      
      if (prods.length > 0) {
        setHeroItems(prods.slice(0, 3));
      }
    });`
);

fs.writeFileSync('src/components/ParallaxHero.tsx', content);
