#!/bin/bash
# Script para gerar certificados autoassinados para HTTPS local no projeto

if [ ! -d "certs" ]; then
  mkdir certs
  echo "Pasta 'certs' criada."
fi

openssl req -newkey rsa:2048 -nodes -keyout certs/key.pem -x509 -days 365 -out certs/cert.pem -subj "/C=BR/ST=Parana/L=Cornelio/O=DisneyPedia/OU=Dev/CN=localhost"

echo "✅ Certificados SSL gerados com sucesso na pasta 'certs/'"
echo "   - Chave: certs/key.pem"
echo "   - Certificado: certs/cert.pem"
echo "Agora você pode iniciar o backend com 'npm run dev'."