const fs = require('fs');

function fix(file, brokenEnding, replacementEnding) {
  let code = fs.readFileSync(file, 'utf8');
  
  // Find "price: typeof data.price === 'string' ? (data.price.includes('R"
  const prefix = "price: typeof data.price === 'string' ? (data.price.includes('R";
  const startIdx = code.indexOf(prefix);
  if (startIdx === -1) return;

  const replaceStr = "price: typeof data.price === 'string' ? (data.price.includes('R$') ? data.price : `R$ ${data.price}`) : `R$ ${Number(data.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`" + replacementEnding;
  
  // Replace the broken line
  // We need to replace from startIdx to the brokenEnding
  const endIdx = code.indexOf(brokenEnding, startIdx);
  if (endIdx !== -1) {
    code = code.substring(0, startIdx) + replaceStr + code.substring(endIdx + brokenEnding.length);
    fs.writeFileSync(file, code);
    console.log('Fixed ' + file);
  }
}

fix('src/components/ParallaxHero.tsx', '      });', ",\n          image: data.image || '/logomeed.png',\n          color: \"from-orange-600 to-amber-600\",\n          glow: \"shadow-[0_0_80px_rgba(221,113,28,0.4)]\"\n        };\n      });");

fix('src/components/ProductCatalog.tsx', '      });', "\n        };\n      });");
fix('src/components/SearchModal.tsx', '      });', "\n        };\n      });");

fix('src/components/SearchModal.tsx', '      }));', "\n        };\n      }));");
