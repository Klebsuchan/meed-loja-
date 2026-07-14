const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "import { useAuth } from './AuthContext';",
  "import { useAuth } from './AuthContext';\nimport { PromoPopup } from './components/PromoPopup';"
);

content = content.replace(
  "<FloatingWhatsApp />",
  "<FloatingWhatsApp />\n        <PromoPopup />"
);

fs.writeFileSync('src/App.tsx', content);
