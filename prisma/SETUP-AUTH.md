# Configuração de Autenticação - GM Faces Admin

## Passo 1: Gerar Hash da Senha

Antes de executar o script SQL no Supabase, você precisa gerar o hash da senha `gmfaces123`.

### Opção 1: Usando Node.js (Recomendado)

1. Instale as dependências:
```bash
npm install
```

2. Execute o script:
```bash
node scripts/generate-password-hash.js
```

3. Copie o hash gerado e substitua no arquivo `prisma/supabase-init.sql` na linha do INSERT do usuário.

### Opção 2: Usando um gerador online

Use um gerador de bcrypt online (como https://bcrypt-generator.com/) com:
- Rounds: 10
- Password: `gmfaces123`

## Passo 2: Executar Script SQL no Supabase

1. Acesse o Supabase Dashboard
2. Vá em SQL Editor
3. Execute o script `prisma/supabase-init.sql` (com o hash correto da senha)

## Passo 3: Credenciais de Acesso

Após configurar o banco, use estas credenciais para acessar o admin:

- **Email:** `gmira@gmira.com`
- **Senha:** `gmfaces123`

## Passo 4: Acessar o Admin

Acesse: `http://localhost:3000/gmfaces/admin/login`

## Notas de Segurança

- Em produção, altere a senha padrão
- Use variáveis de ambiente para configurações sensíveis
- Considere implementar JWT tokens em vez de cookies simples
- Habilite HTTPS em produção







