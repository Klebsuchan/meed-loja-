const fs = require('fs');
const file = 'src/components/Footer.tsx';
let code = fs.readFileSync(file, 'utf8');

const target = `onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }}`;

code = code.replace(target, '');
fs.writeFileSync(file, code);
