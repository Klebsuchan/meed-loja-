const fs = require('fs');

const indexHtml = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <title>Meed Loja Online | Eletrônicos e Acessórios em Passo Fundo - RS</title>
    
    <!-- SEO Meta Tags Básicas -->
    <meta name="description" content="A Meed Loja Online é a melhor loja de eletrônicos, fones e smartwatches de Passo Fundo - RS. Compre online com o melhor preço e entrega via motoboy no mesmo dia!" />
    <meta name="keywords" content="loja de eletrônicos Passo Fundo, comprar smartwatch Passo Fundo, comprar fone bluetooth Passo Fundo, loja de tecnologia Passo Fundo RS, acessórios para celular Passo Fundo, Meed Loja Online, entrega rápida Passo Fundo" />
    <meta name="author" content="Meed Loja Online" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="geo.region" content="BR-RS" />
    <meta name="geo.placename" content="Passo Fundo" />
    <meta name="geo.position" content="-28.2612;-52.4083" />
    <meta name="ICBM" content="-28.2612, -52.4083" />
    <link rel="canonical" href="https://meedloja.com.br/" />
    
    <!-- Open Graph / Facebook / LinkedIn -->
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="Meed Loja Online" />
    <meta property="og:url" content="https://meedloja.com.br/" />
    <meta property="og:title" content="Meed Loja Online | O Melhor Preço em Eletrônicos de Passo Fundo" />
    <meta property="og:description" content="Os melhores eletrônicos e acessórios com entrega rápida via motoboy em Passo Fundo. Confira nossas ofertas exclusivas!" />
    <meta property="og:image" content="https://i.postimg.cc/mD8zQx6M/Design-sem-nome-1-removebg-preview.png" />
    <meta property="og:image:width" content="500" />
    <meta property="og:image:height" content="500" />
    <meta property="og:image:alt" content="Logo Meed Loja Online" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Meed Loja Online | Eletrônicos em Passo Fundo" />
    <meta name="twitter:description" content="Os melhores eletrônicos e acessórios com entrega rápida via motoboy em Passo Fundo. Confira nossas ofertas exclusivas!" />
    <meta name="twitter:image" content="https://i.postimg.cc/mD8zQx6M/Design-sem-nome-1-removebg-preview.png" />

    <!-- Favicons Multi-Dispositivos (PWA, Apple, Android) -->
    <link rel="icon" type="image/png" sizes="32x32" href="https://i.postimg.cc/mD8zQx6M/Design-sem-nome-1-removebg-preview.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="https://i.postimg.cc/mD8zQx6M/Design-sem-nome-1-removebg-preview.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="https://i.postimg.cc/mD8zQx6M/Design-sem-nome-1-removebg-preview.png" />
    <link rel="shortcut icon" href="https://i.postimg.cc/mD8zQx6M/Design-sem-nome-1-removebg-preview.png" />
    <meta name="theme-color" content="#dd711c" />

    <!-- Structured Data (LocalBusiness) para Google Local SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "Meed Loja Online",
      "image": "https://i.postimg.cc/mD8zQx6M/Design-sem-nome-1-removebg-preview.png",
      "@id": "https://meedloja.com.br/",
      "url": "https://meedloja.com.br/",
      "description": "Loja de eletrônicos, fones e smartwatches em Passo Fundo, RS com entrega no mesmo dia.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Passo Fundo",
        "addressRegion": "RS",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -28.2612,
        "longitude": -52.4083
      },
      "priceRange": "$$",
      "paymentAccepted": "Cartão de Crédito, Pix, Dinheiro",
      "currenciesAccepted": "BRL"
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

fs.writeFileSync('index.html', indexHtml);
