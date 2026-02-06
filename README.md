# Gabi Xavier | Studio de Pilates e Fisioterapia

Landing page premium desenvolvida em Next.js para venda de curso online de Pilates, com quiz personalizado e experiência premium.

## 🎯 Funcionalidades

### Quiz Interativo (/quiz)
- **10 perguntas personalizadas** com validação
- Barra de progresso visual
- Coleta informações sobre:
  - Dados físicos (peso, altura, idade, sexo)
  - Objetivo principal (postura, dores, core, flexibilidade, etc.)
  - Nível de experiência
  - Tempo disponível
  - Preferências de treino
  - Dificuldades atuais
- Armazena dados no localStorage (chave: `gx_quiz_profile`)
- Tela de resultado personalizada

### Landing Page (/landing)
- **Hero personalizado** baseado no perfil do quiz:
  - Headline adaptada ao objetivo
  - 3 bullets específicos para o perfil
  - Selo com plano sugerido (tempo, nível, foco)
- Seções completas:
  - Vídeo de apresentação
  - O que você vai receber (6 cards)
  - Benefícios físicos e práticos
  - Demonstração de exercícios
  - Depoimentos de alunas
  - Oferta com preço e detalhes
  - FAQ com accordion
  - Footer profissional
- **5+ CTAs estratégicos** distribuídos pela página
- **Sticky Mobile CTA** fixo no rodapé (mobile)
- Scroll suave para seções

### Tracking de Eventos
Funções simuladas prontas para integração:
- `quiz_start` - Início do quiz
- `quiz_complete` - Finalização do quiz
- `view_landing` - Visualização da landing
- `cta_click` - Cliques em CTAs
- `purchase_click` - Clique no botão de compra

## 🎨 Design System

### Paleta de Cores
```css
Primary: #330066
Deep: #2A0158
Accent: #9564EF
CTA: #7750BF
Soft: #B9A0DC
Background: #EEE7F6
Base: #FFFFFF
Text: #1E1E24
Border: #E6E0F0
```

### Tipografia
- **Títulos**: Playfair Display (Google Fonts)
- **Corpo/UI**: Poppins (Google Fonts)

### Design Tokens
Todas as variáveis CSS definidas em `app/globals.css`:
- Cores
- Tamanhos de fonte
- Espaçamentos
- Border radius
- Sombras
- Transições
- Z-index

## 🛠️ Tecnologias

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: CSS Modules
- **Sem**: Tailwind, Bootstrap, Vite

## 📁 Estrutura do Projeto

```
gabi-xavier-pilates/
├── app/
│   ├── layout.tsx              # Layout raiz com Header
│   ├── page.tsx                # Redireciona para /quiz
│   ├── globals.css             # Estilos globais + design tokens
│   ├── quiz/
│   │   ├── page.tsx            # Página do quiz
│   │   └── page.module.css
│   └── landing/
│       ├── page.tsx            # Landing page principal
│       └── page.module.css
├── components/
│   ├── Button.tsx/module.css
│   ├── Card.tsx/module.css
│   ├── Container.tsx/module.css
│   ├── Section.tsx/module.css
│   ├── Header.tsx/module.css
│   ├── ProgressBar.tsx/module.css
│   ├── VideoBlock.tsx/module.css
│   ├── Testimonials.tsx/module.css
│   ├── FAQ.tsx/module.css
│   └── StickyMobileCTA.tsx/module.css
├── config/
│   └── urls.ts                 # URLs configuráveis (checkout, plataforma)
└── lib/
    ├── profile.ts              # Tipos + geração de conteúdo personalizado
    ├── storage.ts              # Funções localStorage (SSR-safe)
    └── tracking.ts             # Funções de tracking de eventos
```

## 🚀 Como Executar

### Instalação
```bash
cd gabi-xavier-pilates
npm install
```

### Desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build de Produção
```bash
npm run build
npm start
```

## ⚙️ Configuração

### URLs
Edite `config/urls.ts` para configurar:
- `CHECKOUT_URL` - URL do checkout (Hotmart, Kiwify, etc.)
- `COURSE_PLATFORM_URL` - URL da plataforma de curso

### Tracking
Edite `lib/tracking.ts` para integrar com:
- Google Analytics
- Meta Pixel
- Hotmart
- Outras ferramentas de analytics

## 🎯 Fluxo de Conversão

1. Usuário acessa `/` → Redireciona para `/quiz`
2. Completa as 10 perguntas do quiz
3. Recebe perfil personalizado
4. Clica em "Ver o plano ideal para mim"
5. Redireciona para `/landing` com conteúdo personalizado
6. Navega pelos benefícios e provas sociais
7. Clica em CTA para ir ao checkout
8. Abre `CHECKOUT_URL` em nova aba

## 📱 Responsividade

- Mobile-first design
- Breakpoint principal: 768px
- Sticky CTA aparece apenas em mobile
- Grids responsivos com auto-fit
- Typography scaling

## ✨ Diferenciais

- ✅ Design premium com paleta profissional
- ✅ Personalização real baseada no quiz
- ✅ Microinterações e animações sutis
- ✅ CTAs estratégicos em múltiplos pontos
- ✅ Social proof com depoimentos
- ✅ FAQ para reduzir objeções
- ✅ Garantia destacada na oferta
- ✅ Acessibilidade (focus visible, aria attributes)
- ✅ SEO-friendly (metadata, semantic HTML)
- ✅ Performance (CSS Modules, no runtime CSS)

## 🔒 Segurança

- Validação de inputs no quiz
- SSR-safe localStorage
- Sanitização de dados
- TypeScript para type safety

## 📈 Próximos Passos

1. Adicionar imagens reais (logo, fotos, thumbnails de exercícios)
2. Integrar analytics (Google Analytics, Meta Pixel)
3. Conectar checkout real
4. Adicionar vídeo de apresentação (YouTube ou Vimeo)
5. Implementar testes A/B
6. Adicionar mais depoimentos com fotos
7. Criar páginas de termos e privacidade
8. Configurar domínio customizado

## 📄 Licença

© 2024 Gabi Xavier. Todos os direitos reservados.
