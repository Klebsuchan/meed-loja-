const fs = require('fs');
let content = fs.readFileSync('src/components/SearchModal.tsx', 'utf8');

content = content.replace(/React\.MouseEvent/g, 'MouseEvent');
content = content.replace(/import \{ useState, useEffect, useRef \} from 'react';/, "import { useState, useEffect, useRef, MouseEvent } from 'react';");

fs.writeFileSync('src/components/SearchModal.tsx', content);
