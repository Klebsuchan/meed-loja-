const fs = require('fs');
let content = fs.readFileSync('src/components/ProductCatalog.tsx', 'utf8');

content = content.replace(
  'function ProductCard({ product, index, onClick }: { product: any; index: number; onClick: () => void; key?: any }) {',
  'function ProductCard({ product, index, onClick }: { product: any; index: number; onClick: () => void; key?: React.Key }) {'
);

// If it's still original:
content = content.replace(
  'function ProductCard({ product, index, onClick }: { product: any; index: number; onClick: () => void }) {',
  'function ProductCard({ product, index, onClick }: { product: any; index: number; onClick: () => void; key?: React.Key }) {'
);

if (!content.includes('import React')) {
  content = content.replace(
    "import { useRef, useState, useEffect } from 'react';",
    "import React, { useRef, useState, useEffect } from 'react';"
  );
}

fs.writeFileSync('src/components/ProductCatalog.tsx', content);
