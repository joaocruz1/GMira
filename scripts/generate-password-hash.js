// Script para gerar hash da senha
// Execute: node scripts/generate-password-hash.js

const bcrypt = require('bcrypt');

const password = 'gmfaces123';

bcrypt.hash(password, 10).then(hash => {
  console.log('\n========================================');
  console.log('Hash da senha gerado:');
  console.log(hash);
  console.log('========================================\n');
  console.log('Use este hash no script SQL do Supabase');
}).catch(err => {
  console.error('Erro ao gerar hash:', err);
});








