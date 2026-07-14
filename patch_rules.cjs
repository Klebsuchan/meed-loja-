const fs = require('fs');
let content = fs.readFileSync('firestore.rules', 'utf8');

content = content.replace(
  "return request.auth != null && request.auth.token.email == 'braian.kleber.camargo@gmail.com';",
  "return request.auth != null && request.auth.token.get('email', '') == 'braian.kleber.camargo@gmail.com';"
);

fs.writeFileSync('firestore.rules', content);
