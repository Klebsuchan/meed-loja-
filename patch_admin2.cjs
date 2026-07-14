const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

content = content.replace(
  "  const [isAuthenticated, setIsAuthenticated] = useState(false);\n  const [password, setPassword] = useState('');",
  "  const { user, isAdmin, login } = useAuth();\n  const isAuthenticated = isAdmin;"
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
