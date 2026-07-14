const fs = require('fs');
let content = fs.readFileSync('src/components/ProductCatalog.tsx', 'utf8');

content = content.replace(
  /\{ product: any; index: number; onClick: \(\) => void \}/,
  '{ product: any; index: number; onClick: () => void; key?: any }'
);

fs.writeFileSync('src/components/ProductCatalog.tsx', content);
