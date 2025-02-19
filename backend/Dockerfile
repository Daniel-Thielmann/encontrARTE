# Usa a imagem do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./

# Usa a imagem oficial do Node.js
FROM node:18-alpine

# Instalar OpenSSL 1.1 e outras dependências necessárias
RUN apk add --no-cache openssl

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Gera o Prisma Client dentro do container
RUN npx prisma generate

# Expõe a porta do backend
EXPOSE 3000

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta do backend
EXPOSE 3000

# Comando para rodar o backend
CMD ["npm", "run", "start"]
