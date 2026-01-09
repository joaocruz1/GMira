# Configuração de Email - GM Faces

Este documento explica como configurar o envio de emails para notificações de novos cadastros de influenciadores.

## Variáveis de Ambiente Necessárias

Adicione as seguintes variáveis ao seu arquivo `.env.local` (ou `.env`):

```env
# Configurações de Email (Nodemailer)
# Para Gmail, você precisa criar uma "Senha de App" em: https://myaccount.google.com/apppasswords
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app

# Email que receberá as notificações de cadastro
EMAIL_RECIPIENT=destinatario@gmail.com

# Nome que aparecerá no remetente do email
EMAIL_FROM_NAME=GM Faces
```

## Configuração para Gmail

1. Acesse [Google Account](https://myaccount.google.com/)
2. Vá em **Segurança** → **Verificação em duas etapas** (precisa estar ativada)
3. Role até **Senhas de app** e clique em **Senhas de app**
4. Selecione **Email** e **Outro (nome personalizado)**
5. Digite "GM Faces" e clique em **Gerar**
6. Copie a senha gerada (16 caracteres) e use no `SMTP_PASS`

## Outros Provedores de Email

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Servidor SMTP Personalizado
```env
SMTP_HOST=seu-servidor-smtp.com
SMTP_PORT=587
SMTP_SECURE=false  # ou true para porta 465
```

## Teste

Após configurar as variáveis, quando um influenciador se cadastrar através do formulário, você receberá um email formatado com todos os dados do cadastro.

## Nota

Se as variáveis de ambiente não estiverem configuradas, o sistema continuará funcionando normalmente (salvando no banco de dados), mas não enviará emails. Um aviso será registrado no console.


