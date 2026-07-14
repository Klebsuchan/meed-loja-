const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf8');

const newRule = `    match /hero_items/{itemId} {
      allow read: if true;
      allow write: if true;
    }
  }
}`;

code = code.replace(/  \}\n\}/, newRule);
fs.writeFileSync('firestore.rules', code);
