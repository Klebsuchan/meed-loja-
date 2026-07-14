const fs = require('fs');
let content = fs.readFileSync('src/components/ProductCatalog.tsx', 'utf8');

content = content.replace(
  'function ProductCard({ product, index, onClick }: { product: any; index: number; onClick: () => void; }) {',
  'function ProductCard({ product, index, onClick }: { product: any; index: number; onClick: () => void; key?: React.Key }) {'
);

fs.writeFileSync('src/components/ProductCatalog.tsx', content);
