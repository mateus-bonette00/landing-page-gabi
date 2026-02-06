# Guia de Configuração Inicial

Este guia contém instruções para configurar e personalizar a landing page da Gabi Xavier.

## 1️⃣ Configurar URLs de Checkout

Edite o arquivo `config/urls.ts`:

```typescript
export const CHECKOUT_URL = 'SUA_URL_DO_HOTMART_OU_KIWIFY';
export const COURSE_PLATFORM_URL = 'URL_DA_SUA_PLATAFORMA';
```

Exemplos:
- Hotmart: `https://pay.hotmart.com/XXXXX`
- Kiwify: `https://kiwify.app/XXXXX`

## 2️⃣ Integrar Ferramentas de Analytics

### Google Analytics

1. Edite `lib/tracking.ts`
2. Descomente e adicione seu código de tracking:

```typescript
if (window.gtag) {
  window.gtag('event', event, data);
}
```

3. Adicione o script do GA no `app/layout.tsx` dentro do `<head>`.

### Meta Pixel (Facebook)

1. Edite `lib/tracking.ts`
2. Descomente e adicione seu código de tracking:

```typescript
if (window.fbq) {
  window.fbq('track', event, data);
}
```

3. Adicione o script do Meta Pixel no `app/layout.tsx` dentro do `<head>`.

## 3️⃣ Personalizar Conteúdo

### Depoimentos

Edite `app/landing/page.tsx` e modifique o array `testimonials`:

```typescript
const testimonials = [
  {
    name: 'Nome da Aluna',
    rating: 5,
    comment: 'Depoimento completo aqui...',
    location: 'Cidade, Estado'
  },
  // Adicione mais depoimentos...
];
```

### FAQ

Edite `app/landing/page.tsx` e modifique o array `faqItems`:

```typescript
const faqItems = [
  {
    question: 'Sua pergunta aqui?',
    answer: 'Sua resposta detalhada aqui.'
  },
  // Adicione mais perguntas...
];
```

### Preços

Edite `app/landing/page.tsx` na seção de oferta:

```typescript
<div className={styles.priceOld}>De R$ 597</div>
<div className={styles.price}>
  <span className={styles.currency}>R$</span>
  <span className={styles.amount}>297</span>
</div>
<div className={styles.installments}>ou 12x de R$ 29,18</div>
```

## 4️⃣ Adicionar Imagens

### Logo no Header

1. Adicione sua logo em `public/logo.png`
2. Edite `components/Header.tsx`:

```tsx
import Image from 'next/image';

// Substitua o texto por:
<Image src="/logo.png" alt="Gabi Xavier" width={200} height={60} />
```

### Vídeo de Apresentação

Edite `app/landing/page.tsx`:

```tsx
<VideoBlock
  title="Conheça a Gabi Xavier"
  description="..."
  videoUrl="https://www.youtube.com/embed/SEU_VIDEO_ID"
  // ou
  thumbnailUrl="/thumbnail-video.jpg"
/>
```

### Fotos de Exercícios

1. Adicione fotos em `public/exercises/`
2. Edite a seção de exercícios em `app/landing/page.tsx`
3. Substitua os placeholders por:

```tsx
<Image
  src="/exercises/hundred.jpg"
  alt="Hundred"
  width={400}
  height={225}
/>
```

## 5️⃣ Customizar Cores (Opcional)

Se quiser alterar a paleta de cores, edite `app/globals.css`:

```css
:root {
  --color-primary: #330066;  /* Sua cor primária */
  --color-cta: #7750BF;      /* Cor dos botões */
  /* ... */
}
```

## 6️⃣ SEO e Metadata

Edite `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Seu título customizado",
  description: "Sua descrição customizada",
};
```

Para páginas específicas, crie um arquivo `metadata.ts` em cada pasta de rota.

## 7️⃣ Contato no Footer

Edite `app/landing/page.tsx`:

```tsx
<a href="mailto:seu@email.com">seu@email.com</a>
<a href="https://instagram.com/seu_perfil">Instagram</a>
```

## 8️⃣ Deploy

### Vercel (Recomendado)

1. Crie conta em [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Deploy automático!

### Outras opções:
- Netlify
- AWS Amplify
- Google Cloud Run

## 🎨 Testes Finais

Antes de publicar:

1. ✅ Teste o quiz completo
2. ✅ Verifique todas as URLs
3. ✅ Teste em mobile e desktop
4. ✅ Confirme que o tracking funciona
5. ✅ Teste o fluxo de checkout
6. ✅ Verifique loading de imagens
7. ✅ Teste todos os CTAs

## 🆘 Suporte

Se precisar de ajuda:
- Consulte o [README.md](./README.md)
- Veja a documentação do [Next.js](https://nextjs.org/docs)
- Revise o código nos arquivos comentados
