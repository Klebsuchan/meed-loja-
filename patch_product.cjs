const fs = require('fs');
let content = fs.readFileSync('src/components/ProductCatalog.tsx', 'utf8');

// replace the ProductCard declaration completely to fix the typing issue
content = content.replace(
  /function ProductCard\(\{ product, index, onClick \}: \{ product: any; index: number; onClick: \(\) => void; key\?: any \}\)/,
  'function ProductCard({ product, index, onClick }: { product: any; index: number; onClick: () => void; key?: React.Key })'
);

content = content.replace(
  /import \{ useRef, useState, useEffect \} from 'react';/,
  "import React, { useRef, useState, useEffect } from 'react';"
);

fs.writeFileSync('src/components/ProductCatalog.tsx', content);
