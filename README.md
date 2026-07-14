# Meed Loja Online 🎧

Bem-vindo ao repositório da **Meed Loja Online**, um e-commerce moderno, rápido e com design premium para venda de acessórios eletrônicos de alto padrão.

O projeto foi construído com foco em performance, experiência do usuário (UX) e facilidade de administração (Admin Panel integrado).

## ✨ Principais Funcionalidades

### Para os Clientes
*   **Vitrine Moderna (Parallax Hero):** Interface com banners dinâmicos e efeito parallax imersivo.
*   **Catálogo Responsivo:** Filtros por categoria, exibição de imagens em alta qualidade e selos de novidades.
*   **Carrinho Lateral (Sidebar Cart):** Adição de produtos ao carrinho sem sair da página atual, com cálculo instantâneo.
*   **Checkout Simplificado:** Fluxo de pagamento claro, com validação de cupons de desconto.
*   **Painel do Cliente:** Acompanhamento de status dos pedidos em andamento e histórico de compras.
*   **Avisos e Ofertas:** Pop-up promocional e botão flutuante para contato direto via WhatsApp.

### Para o Administrador
*   **Dashboard Protegido:** Acesso restrito por senha para gerenciamento da loja.
*   **Gestão de Produtos:** Adicionar, editar e remover produtos com facilidade.
*   **Gestão de Pedidos:** Acompanhar as vendas, ver detalhes dos clientes e endereços de entrega.
*   **Sistema de Cupons:** Criar códigos promocionais com porcentagem de desconto, ativá-los ou inativá-los.
*   **Marketing & Recuperação:** Ferramenta integrada para identificar carrinhos abandonados (mais de 7 dias) e disparar e-mails de recuperação.

## 🚀 Tecnologias Utilizadas

O projeto utiliza um stack moderno e robusto:

*   **[React](https://react.dev/) 19** - Biblioteca JavaScript para construção de interfaces.
*   **[TypeScript](https://www.typescriptlang.org/)** - Adiciona tipagem estática ao JavaScript para código mais seguro.
*   **[Vite](https://vitejs.dev/)** - Bundler ultrarrápido para desenvolvimento frontend.
*   **[Tailwind CSS](https://tailwindcss.com/) v4** - Framework de utilitários CSS para estilização ágil.
*   **[Framer Motion](https://motion.dev/)** - Biblioteca poderosa para animações fluidas e complexas.
*   **[Firebase](https://firebase.google.com/)** - Infraestrutura backend as a service:
    *   **Firestore:** Banco de dados NoSQL em tempo real para produtos, pedidos e carrinhos.
    *   **Authentication:** Autenticação segura de usuários.
*   **[Lucide React](https://lucide.dev/)** - Ícones limpos e escaláveis.

## 📁 Estrutura de Diretórios (Resumo)

```bash
📦 src
 ┣ 📂 components
 ┃ ┣ 📜 AboutUs.tsx          # Seção sobre a marca
 ┃ ┣ 📜 AdminPanel.tsx       # Painel administrativo da loja
 ┃ ┣ 📜 CartSidebar.tsx      # Carrinho de compras lateral
 ┃ ┣ 📜 CookieBanner.tsx     # Aviso de consentimento de cookies
 ┃ ┣ 📜 FAQ.tsx              # Perguntas frequentes
 ┃ ┣ 📜 FloatingWhatsApp.tsx # Botão flutuante de contato
 ┃ ┣ 📜 Footer.tsx           # Rodapé do site
 ┃ ┣ 📜 Header.tsx           # Navegação principal
 ┃ ┣ 📜 ParallaxHero.tsx     # Hero section principal
 ┃ ┣ 📜 ProductCatalog.tsx   # Listagem de produtos
 ┃ ┣ 📜 PromoPopup.tsx       # Pop-up de desconto
 ┃ ┣ 📜 Testimonials.tsx     # Depoimentos de clientes
 ┃ ┣ 📜 ToastContainer.tsx   # Notificações de ações
 ┃ ┗ 📜 UserOrders.tsx       # Pedidos do cliente
 ┣ 📂 lib
 ┃ ┗ 📜 firebase.ts          # Inicialização e configs do Firebase
 ┣ 📜 App.tsx                # Estrutura principal da interface
 ┣ 📜 AuthContext.tsx        # Contexto de autenticação
 ┣ 📜 CartContext.tsx        # Contexto do carrinho de compras
 ┣ 📜 index.css              # Estilos globais (Tailwind)
 ┗ 📜 main.tsx               # Ponto de entrada da aplicação
```

## 🛠️ Configuração e Execução

### Pré-requisitos
*   Node.js (versão 18+)
*   Gerenciador de pacotes (npm, yarn ou pnpm)
*   Projeto configurado no [Firebase Console](https://console.firebase.google.com/)

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e adicione as chaves do seu Firebase:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

### Rodando o Projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/meed-loja-online.git
   cd meed-loja-online
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:3000` no seu navegador.

## 🛡️ Regras do Firebase Firestore

Certifique-se de configurar as regras de segurança no Firestore para garantir que os dados fiquem protegidos:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if true; // Apenas para dev, em prod ajuste para admin!
    }
    match /orders/{orderId} {
      allow read, write: if true;
    }
    match /coupons/{couponId} {
      allow read, write: if true;
    }
    match /carts/{cartId} {
      allow read, write: if true;
    }
    match /mail/{mailId} {
      allow read, write: if true;
    }
  }
}
```
*(Nota: As regras atuais estão abertas para facilitar o ambiente de demonstração. Lembre-se de restringir a permissão de escrita usando validação de tokens em produção).*

## 🔒 Acesso ao Painel Admin

Para acessar a aba do Painel Administrativo, você deve usar a URL com hash:
`http://localhost:3000/#admin`

A senha padrão para acesso local no ambiente de testes é validada via código (padrão demo: `meed123online`).

## 📄 Licença

Este projeto é apenas para fins de demonstração e portfólio. Todos os direitos reservados.
