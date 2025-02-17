# 📌 EncontrARTE - Aplicativo de Gestão de Saúde para a Maturidade

## 📖 Visão Geral

O **EncontrARTE** é um aplicativo inovador de gestão de saúde voltado para a terceira idade e seus cuidadores. Ele centraliza o gerenciamento de medicamentos, compromissos médicos, monitoramento de saúde e tarefas diárias, promovendo maior independência e qualidade de vida. Além disso, facilita a organização da rotina e o fortalecimento da rede de apoio.

## 🚀 Tecnologias Utilizadas

### **Frontend**

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)

### **Backend**

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)

## 🏗 Estrutura do Projeto

### **Frontend**

```
/src
  /app -> Páginas e layouts da aplicação
  /pages -> Páginas do app
  /components -> Componentes reutilizáveis
  /server -> Comunicação com a API via Axios (mudar IP conforme a rede)
  /styles -> Configuração do Tailwind CSS
  /utils -> Configuração do calendário
```

### **Backend**

A organização segue a estrutura padrão do **NestJS**, onde cada funcionalidade possui:

- **DTO** (Data Transfer Object)
- **Controller** (Definição das rotas)
- **Service** (Lógica de negócios)
- **Module** (Organização das dependências)

📚 [Documentação oficial do NestJS](https://docs.nestjs.com/)

## 🔧 Como Rodar o Projeto

### **Frontend**

```sh
git clone <repositório>
cd frontend
npm install
npm run dev
```

### **Backend**

Pré-requisito: **Docker** instalado

```sh
git clone <repositório>
cd backend
npm install
docker compose up
npx prisma migrate dev
npm run start
```

## 🎯 Funcionalidades Principais

✔ **Gestão de Medicamentos**

- Agendamento com notificações
- Controle de estoque e alertas de reposição
- Geração automática de lista de compras

✔ **Monitoramento de Saúde**

- Registro de pressão arterial e glicose
- Histórico de medições

✔ **Organização de Eventos**

- Compartilhamento de compromissos
- Gerenciamento de presenças
- Integração com APIs externas (ex.: Sympla)

✔ **Rede de Apoio Personalizada**

- Sistema de autenticação para múltiplos cuidadores
- Perfis de pacientes com informações médicas e cuidadores responsáveis

✔ **Planejamento de Hábitos Saudáveis**

- Metas semanais
- Notificações para atividades físicas e autoavaliação mensal

## 🏆 Diferenciais do Projeto

✅ Aplicativo multiplataforma (Android e iOS)  
✅ Interface intuitiva e acessível para idosos  
✅ Segurança de dados com criptografia e autenticação  
✅ Integração com serviços externos para eventos de bem-estar  
✅ Impacto social positivo na qualidade de vida de idosos e cuidadores

## 🔒 Segurança e Privacidade

O **EncontrARTE** utiliza:

- **Criptografia** para proteção de dados sensíveis
- **Autenticação segura** para acesso de cuidadores e pacientes

## 💼 Modelo de Negócio

- **Plano gratuito** com funcionalidades essenciais
- **Plano premium** para recursos avançados e integrações

## 📌 Status do Desenvolvimento

- 🟢 **Interface do usuário - Finalizada**
- 🟠 **Funcionalidade de Codi Challenge - Em progresso**
- 🟢 **Controle de Estoque - Finalizado**
- 🟢 **Cadastro de Rotina e Geração de Lembretes - Finalizado**
- 🟠 **Melhorias no calendário e novos eventos - Em andamento**

## 🎯 Próximos Passos

📌 Finalizar a implementação da confirmação de ingestão no calendário  
📌 Permitir cadastramento de eventos diversos (consultas, fisioterapia, etc.)  
📌 Implementar níveis de acesso para gerenciar múltiplos pacientes
