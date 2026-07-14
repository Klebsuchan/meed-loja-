const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "  useEffect(() => {\n    const onHashChange = () => setHash(window.location.hash);",
  "  useEffect(() => {\n    if (window.location.hash === '#admin' || window.location.hash === '#orders') {\n      window.history.replaceState(null, '', window.location.pathname + window.location.search);\n      setHash('');\n    }\n    const onHashChange = () => setHash(window.location.hash);"
);

fs.writeFileSync('src/App.tsx', content);
