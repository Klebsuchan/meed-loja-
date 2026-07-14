const fs = require('fs');
let content = fs.readFileSync('src/components/CartSidebar.tsx', 'utf8');

content = content.replace(/React\.FormEvent/g, 'FormEvent');
content = content.replace(/import \{ useState \} from 'react';/, "import { useState, FormEvent } from 'react';");

fs.writeFileSync('src/components/CartSidebar.tsx', content);
