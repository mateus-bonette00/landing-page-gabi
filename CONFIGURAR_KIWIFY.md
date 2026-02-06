# 🚀 Como Configurar a Kiwify para seu Curso de Pilates

## ✅ Valor Configurado no Site: R$ 29,90

---

## 📋 PASSO A PASSO COMPLETO

### **ETAPA 1: Criar Conta na Kiwify**

1. Acesse: **https://kiwify.com.br**
2. Clique em **"Criar conta grátis"**
3. Preencha:
   - Nome completo: Gabriela Xavier
   - Email: seu@email.com
   - Senha: (crie uma senha forte)
   - CPF
4. Confirme o email (código chegará por email)
5. Complete o cadastro

---

### **ETAPA 2: Configurar Dados Bancários**

1. No painel da Kiwify, vá em: **"Configurações"** → **"Financeiro"**
2. Adicione seus dados bancários:
   - Tipo de conta: Pessoa Física
   - Banco: (seu banco)
   - Agência: (número da agência)
   - Conta: (número da conta)
   - CPF
3. Clique em **"Salvar"**

⚠️ **Importante**: Sem esses dados você não consegue receber os pagamentos!

---

### **ETAPA 3: Criar o Produto (Curso)**

1. No menu lateral, clique em **"Produtos"** → **"Novo Produto"**
2. Preencha:
   - **Nome do produto**: Curso Completo de Pilates Online
   - **Tipo de produto**: Área de Membros
   - **Preço**: R$ 29,90
   - **Comissão para afiliados**: 0% (deixe zerado se não tiver afiliados)
3. Clique em **"Criar Produto"**

---

### **ETAPA 4: Configurar o Checkout (Página de Pagamento)**

1. Dentro do produto criado, vá em **"Checkout"**
2. Configure:
   - **Checkout Transparente**: ATIVE (permite personalizar)
   - **Meios de pagamento**:
     - ✅ Pix (pagamento instantâneo)
     - ✅ Cartão de Crédito
     - ✅ Boleto (opcional)
   - **Parcelamento**: Deixe "À vista" (valor é baixo)
3. **Personalize**:
   - Faça upload da logo da Gabi Xavier
   - Escolha as cores (use as mesmas do site)
4. Clique em **"Salvar"**

---

### **ETAPA 5: Criar Área de Membros (Onde Ficam os Vídeos)**

1. No produto, clique em **"Área de Membros"**
2. Clique em **"Adicionar Módulo"**

**Sugestão de Estrutura:**

#### **Módulo 1 - Bem-vindo**
- Aula 1: Introdução ao Curso
- Aula 2: Como Usar a Plataforma

#### **Módulo 2 - Pilates para Iniciantes**
- Aula 1: Fundamentos do Pilates
- Aula 2: Respiração Correta
- Aula 3: Exercícios Básicos (10 min)
- Aula 4: Treino Completo Iniciante (20 min)

#### **Módulo 3 - Pilates Intermediário**
- Aula 1: Fortalecimento do Core
- Aula 2: Exercícios de Flexibilidade
- Aula 3: Treino Intermediário (30 min)

#### **Módulo 4 - Pilates Avançado**
- Aula 1: Exercícios Desafiadores
- Aula 2: Treino Avançado (45 min)

#### **Módulo 5 - Treinos por Objetivo**
- Aula 1: Redução de Dores nas Costas
- Aula 2: Melhora de Postura
- Aula 3: Fortalecimento Abdominal

---

### **ETAPA 6: Fazer Upload dos Vídeos**

Para cada aula:

1. Clique em **"Adicionar Aula"**
2. Preencha:
   - **Título**: Nome da aula
   - **Tipo**: Vídeo
3. **Upload do vídeo**:
   - **Opção 1**: Upload direto (limite: 2GB por vídeo)
   - **Opção 2**: Hospedar no YouTube (modo oculto/não listado) e colar o link
   - **Opção 3**: Hospedar no Vimeo e colar o link

4. Adicione uma **descrição** da aula
5. Clique em **"Salvar"**

⚠️ **Dica**: Se seus vídeos forem grandes, use YouTube não listado (gratuito e sem limite)

---

### **ETAPA 7: Configurar Liberação de Conteúdo**

1. Em **"Configurações da Área de Membros"**:
   - **Liberação Imediata**: Todo conteúdo disponível após compra ✅ RECOMENDADO
   - OU
   - **Liberação Programada**: 1 módulo por semana (gotejamento)

2. Configure **Email de Boas-Vindas**:
   ```
   Olá [NOME]!

   Seja bem-vindo(a) ao Curso de Pilates Gabi Xavier! 🎉

   Seu acesso está liberado! Clique no link abaixo para acessar:
   [LINK DA ÁREA DE MEMBROS]

   Qualquer dúvida, estamos à disposição!

   Abraços,
   Gabi Xavier
   ```

3. Personalize as cores da área de membros (use as mesmas do site)

---

### **ETAPA 8: Copiar Link de Checkout**

1. No produto, procure por **"Link de Checkout"** ou **"Link de Pagamento"**
2. Copie o link (será algo como: `https://pay.kiwify.com.br/ABC123DEF`)
3. **IMPORTANTE**: Guarde esse link!

---

### **ETAPA 9: Configurar no Seu Site**

1. Abra o arquivo: `gabi-xavier-pilates/config/urls.ts`
2. Substitua a linha:
   ```typescript
   export const CHECKOUT_URL = 'https://pay.kiwify.com.br/SUBSTITUA_PELO_SEU_LINK';
   ```
   Por:
   ```typescript
   export const CHECKOUT_URL = 'https://pay.kiwify.com.br/SEU_LINK_COPIADO';
   ```
3. Salve o arquivo

---

### **ETAPA 10: Testar Tudo**

1. Na Kiwify, ative o **"Modo de Teste"** (configurações do produto)
2. No seu site, clique em **"Quero Acesso ao Curso"**
3. Faça uma compra teste:
   - Use dados fictícios
   - Use cartão de teste da Kiwify
4. Verifique se:
   - O checkout abre corretamente ✅
   - O pagamento é processado ✅
   - Você recebe email de acesso ✅
   - A área de membros funciona ✅
   - Os vídeos carregam corretamente ✅

5. **Desative o modo de teste** quando tudo estiver OK

---

## 💰 Quanto Você Vai Receber

**Preço do Curso**: R$ 29,90

### Taxas da Kiwify:
- **Taxa**: 4,99% = R$ 1,49
- **Taxa fixa**: R$ 0,49
- **Total de taxas**: R$ 1,98

### Você recebe:
**R$ 27,92 por venda** ✅

---

## 📊 Comparação com Outras Plataformas

Se você usasse:
- **Hotmart** (9,9%): Receberia R$ 27,00 (R$ 0,92 a menos)
- **Eduzz** (8,9%): Receberia R$ 27,24 (R$ 0,68 a menos)
- **Kiwify** (4,99%): Recebe R$ 27,92 ⭐ **MELHOR OPÇÃO**

---

## 📱 Fluxo de Compra para o Cliente

1. Cliente acessa sua landing page
2. Clica em **"Quero Acesso ao Curso"**
3. É redirecionado para checkout da Kiwify
4. Preenche dados e paga (Pix/Cartão)
5. Recebe email com acesso à área de membros
6. Assiste as aulas e aprende! 🎉

---

## 🆘 Suporte Kiwify

- **Email**: suporte@kiwify.com.br
- **WhatsApp**: Disponível no painel
- **Central de Ajuda**: https://ajuda.kiwify.com.br

---

## ✅ Checklist Final

Antes de lançar, certifique-se:

- [ ] Conta criada na Kiwify
- [ ] Dados bancários configurados
- [ ] Produto criado (R$ 29,90)
- [ ] Checkout personalizado
- [ ] Todos os vídeos enviados
- [ ] Área de membros configurada
- [ ] Email de boas-vindas criado
- [ ] Link copiado e configurado no site
- [ ] Compra teste realizada com sucesso
- [ ] Modo de teste desativado
- [ ] Site publicado e funcionando

---

## 🎯 Próximos Passos Após Configurar

1. **Divulgue nas redes sociais** (Instagram, Facebook, WhatsApp)
2. **Crie conteúdo gratuito** para atrair pessoas
3. **Peça depoimentos** dos primeiros alunos
4. **Analise os resultados** no painel da Kiwify
5. **Otimize sua landing page** com base nos dados

---

**Boa sorte com seu curso! 🚀💪**

Se tiver dúvidas sobre a configuração técnica do site, estou aqui para ajudar!
