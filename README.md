# 💰 Finanças Pessoal — Construa Studio

App de gestão financeira pessoal com sincronização entre dispositivos via Google Sheets.

---

## 🚀 Como configurar do zero

### Etapa 1 — Publicar no GitHub Pages

1. Crie uma conta em [github.com](https://github.com) (se ainda não tiver)
2. Clique em **New repository** (botão verde no canto superior direito)
3. Nome sugerido: `financas-pessoal`
4. Deixe **Public** marcado (necessário para o GitHub Pages gratuito)
5. Clique em **Create repository**
6. Na tela seguinte, clique em **uploading an existing file**
7. Arraste o arquivo `index.html` para a área de upload
8. Clique em **Commit changes**
9. Vá em **Settings** (aba no topo do repositório)
10. No menu lateral esquerdo, clique em **Pages**
11. Em "Source", selecione **Deploy from a branch**
12. Branch: **main** / Pasta: **/ (root)**
13. Clique em **Save**
14. Aguarde 1–2 minutos e acesse a URL que aparecerá no topo da página Pages
    - Formato: `https://seu-usuario.github.io/financas-pessoal/`

✅ Seu app já estará acessível de qualquer dispositivo por essa URL.

---

### Etapa 2 — Criar o banco de dados no Google Sheets

1. Acesse [script.google.com](https://script.google.com)
2. Clique em **Novo projeto**
3. Apague todo o código que aparecer no editor
4. Abra o arquivo `Code.gs` deste repositório e cole todo o conteúdo
5. No topo da tela, clique em **Implantar** → **Nova implantação**
6. Clique no ícone de engrenagem ⚙️ ao lado de "Tipo" e selecione **App da Web**
7. Preencha:
   - **Descrição**: `Finanças Pessoal`
   - **Executar como**: `Eu (seu e-mail)`
   - **Quem tem acesso**: `Qualquer pessoa`
8. Clique em **Implantar**
9. Se pedir permissão, clique em **Autorizar acesso** e siga os passos
10. **Copie a URL** que aparecer (começa com `https://script.google.com/macros/s/...`)

> ⚠️ Guarde essa URL com cuidado — ela é sua "chave" de acesso ao banco de dados.

---

### Etapa 3 — Conectar o app ao banco de dados

1. Abra seu app no navegador (URL do GitHub Pages)
2. No menu lateral, clique em **Configurações**
3. Na seção **☁️ Sincronização**, cole a URL do Apps Script no campo indicado
4. Clique em **Salvar URL**
5. O app vai recarregar automaticamente
6. Clique em **⟳ Carregar do Google Sheets** para verificar a conexão

✅ A partir de agora, toda alteração feita no app (em qualquer dispositivo) será salva automaticamente na planilha do Google.

---

## 📱 Usando no celular

- Acesse a URL do GitHub Pages no navegador do celular
- Para salvar como atalho na tela inicial:
  - **iPhone**: botão de compartilhar → "Adicionar à Tela de Início"
  - **Android**: menu do Chrome (⋮) → "Adicionar à tela inicial"

---

## 🔄 Como funciona a sincronização

```
Celular  ─┐
           ├──► Google Apps Script ──► Planilha Google Sheets
Notebook ─┘         (API gratuita)         (banco de dados)
```

- Cada vez que você adiciona, edita ou exclui um lançamento, os dados são enviados automaticamente para a planilha
- Ao abrir o app em qualquer dispositivo, ele carrega os dados da planilha automaticamente
- Se não houver internet, os dados ficam salvos localmente e sincronizam quando a conexão voltar (na próxima abertura)

---

## 🛠️ Atualizar o app (quando houver nova versão)

1. Baixe o novo `index.html`
2. No GitHub, abra o repositório → clique no arquivo `index.html`
3. Clique no ícone de lápis ✏️ (editar)
4. Selecione todo o conteúdo e substitua pelo novo
5. Clique em **Commit changes**
6. Aguarde ~1 minuto e recarregue a página

> Os dados ficam sempre no Google Sheets — atualizar o app não apaga nada.

---

## ❓ Dúvidas frequentes

**Os dados ficam seguros?**
Sim. A planilha fica na sua conta do Google, acessível só por você. A URL do Apps Script funciona como uma senha — não compartilhe com ninguém.

**Preciso pagar alguma coisa?**
Não. GitHub Pages e Google Apps Script são gratuitos para uso pessoal dentro dos limites normais (que são bem generosos para um app financeiro pessoal).

**E se eu perder a URL do Apps Script?**
Acesse [script.google.com](https://script.google.com), abra o projeto, clique em Implantar → Gerenciar implantações. A URL estará lá.
