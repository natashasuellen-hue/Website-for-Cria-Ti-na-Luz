# Como Hospedar seu Site no Vercel (GRÁTIS)

## Passo 1: Baixar os Arquivos do Projeto

1. Clique no botão de download/exportar no Figma Make para baixar todos os arquivos do projeto
2. Extraia o arquivo ZIP no seu computador

## Passo 2: Criar Conta no Vercel

1. Acesse: https://vercel.com
2. Clique em "Sign Up" (Cadastrar)
3. Escolha "Continue with GitHub" (recomendado)
4. Crie uma conta no GitHub se ainda não tiver (é grátis)

## Passo 3: Criar Repositório no GitHub

1. Acesse: https://github.com
2. Clique no botão "+" no canto superior direito
3. Selecione "New repository"
4. Nome do repositório: `cria-ti-na-luz` (ou o nome que preferir)
5. Escolha "Public" (público)
6. Clique em "Create repository"

## Passo 4: Fazer Upload dos Arquivos

### Opção A: Usando GitHub Desktop (Mais Fácil)
1. Baixe o GitHub Desktop: https://desktop.github.com
2. Faça login com sua conta
3. Clique em "Add" > "Add Existing Repository"
4. Selecione a pasta do seu projeto
5. Clique em "Publish repository"

### Opção B: Usando Git Command Line
```bash
# Na pasta do projeto, execute:
git init
git add .
git commit -m "Primeiro commit - Cria Ti na Luz"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/cria-ti-na-luz.git
git push -u origin main
```

### Opção C: Upload Direto pelo GitHub (Mais Simples)
1. Na página do repositório que você criou
2. Clique em "uploading an existing file"
3. Arraste TODOS os arquivos da pasta do projeto
4. Role até o final e clique em "Commit changes"

## Passo 5: Deploy no Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique em "Add New" > "Project"
3. Clique em "Import" ao lado do repositório `cria-ti-na-luz`
4. **NÃO ALTERE NENHUMA CONFIGURAÇÃO**
5. Clique em "Deploy"
6. Aguarde 2-3 minutos

## Pronto! 🎉

Seu site estará online em um endereço como:
`https://cria-ti-na-luz.vercel.app`

Você pode configurar um domínio personalizado depois nas configurações do Vercel.

---

## Observações Importantes:

✅ **Supabase já está configurado** - Seus dados estão salvos na nuvem
✅ **Deploy automático** - Cada vez que você atualizar o código no GitHub, o Vercel faz deploy automaticamente
✅ **100% Gratuito** - O plano grátis do Vercel é suficiente para o seu site
✅ **HTTPS incluído** - Certificado SSL grátis e automático

## Se tiver problemas:

1. Verifique se todos os arquivos foram enviados para o GitHub
2. Verifique se o arquivo `package.json` está presente
3. Entre em contato comigo se precisar de ajuda
