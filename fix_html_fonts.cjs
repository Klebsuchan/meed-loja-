const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const fonts = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
`;

html = html.replace('<!-- SEO Meta Tags Básicas -->', fonts + '    <!-- SEO Meta Tags Básicas -->');
fs.writeFileSync('index.html', html);
