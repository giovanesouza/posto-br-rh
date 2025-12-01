# Sistema de Controle de Férias (Front-end)

## ℹ️ Sobre

Trata de uma aplicação para Controle de Férias de Funcionários de uma das unidades do `Posto BR`, localizada no município de Cabo de Santo Agostinho/PE, `realizado como parte de atividades extensionistas (PEX) em alinhamento com o Objetivo de Desenvolvimento Sustentável (ODS) 8 da ONU`: **"Trabalho decente e crescimento econômico"**. **O projeto teve como foco proporcionar melhorias na organização e gestão dos recursos humanos, promovendo práticas mais eficientes, transparentes e sustentáveis no ambiente de trabalho**.
O sistema foi desenvolvido utilizando tecnologias de código aberto e plataformas gratuitas, visando acessibilidade e sustentabilidade financeira para a organização.

> Projeto desenvolvido como parte avaliativa da disciplina `PROJETO DE EXTENSÃO V`, do curso de `ADS`.


## 💻 Tecnologias e ferramentas utilizadas
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB "Framework front-end")
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black "Linguagem de programação")
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white "Linguagem de estilização")
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white "Versionamento de código")
![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white "Versionamento de código")
![Cypress](https://img.shields.io/badge/Cypress-69D3A7?style=for-the-badge&logo=cypress&logoColor=white "Testes automatizados")
<img src="https://logospng.org/download/vite-js/vite-js-256-logo.png"  width="30" alt="Vite" title="Servidor local" />
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white "Utilizado para subir a aplicação em servidor local e para baixar dependências")
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" width="40" alt="Gerenciador de dependências" title="Gerenciador de dependências" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt='vscode' width="30" alt="IDE vs code" title="IDE vs code" />

## 🧪 Testes Automatizados com Cypress

Com o objetivo de garantir a qualidade, confiabilidade e estabilidade do sistema, foi implementada uma suíte de testes automatizados end-to-end utilizando Cypress.

### 🔍 O que foi testado?

- Fluxo de login

- Cadastro, busca, edição e exclusão de funcionários
- Criação, listagem
- Comportamentos de UI, validações e mensagens de erro
- Garantia de que processos críticos funcionem corretamente em diferentes cenários

### 🚀 Benefícios alcançados

- Redução de falhas manuais em deploys
- Feedback rápido sobre regressões
- Segurança ao atualizar funcionalidades
- Automação repetível que acompanha o crescimento do projeto

Os testes foram estruturados seguindo boas práticas, com reutilização de comandos personalizados, cenários independentes e padronização de seletores para facilitar manutenção.


## Pré-requisitos para executar a aplicação

Antes de utilizar o projeto, certifique-se de seguir as seguintes etapas:

- [x] **Ter o Git instalado na máquina.**
- [x] **Ter o Node.js instalado.**
- [x] **Ter um editor de código de sua preferência.**
- [x] **Ter clonado e executado o repositório do back-end, disponível [aqui](https://github.com/giovanesouza/posto-br-rh-backend).**
- [x] **Clonar este repositório com o comando abaixo:**

  ```shell
  https://github.com/giovanesouza/posto-br-rh.git
  ```

## ⚙️ Configurações necessárias

Com o repositório clonado, execute os seguintes comandos no diretório do projeto:

- **Para baixar as dependências**:

  ```shell
  npm install
  ```

>[!IMPORTANT]
>
> Antes de iniciar este projeto, todas as configurações da aplicação do back-end devem estar concluídas.

- **Para iniciar a aplicação**:

  ```shell
  npm run dev
  ```

## ✅ Resultados obtidos


### Login

https://github.com/user-attachments/assets/ae48a90e-cca1-4dd2-a96c-88530b3f82e4

### Cadastro e busca de funcionários

https://github.com/user-attachments/assets/3f8b50a7-db31-4ef1-bf60-f46b948d26c0

### Atualização e exclusão de funcionários

https://github.com/user-attachments/assets/908991f9-8475-438a-95aa-f782dacb78c3

### Criação, listagem, atualização e exclusão de férias

https://github.com/user-attachments/assets/82a51d58-e4a7-431c-ac72-9326b7183583

### Atualização de usuário

https://github.com/user-attachments/assets/c3efcbbf-8d31-483e-936c-ab45b93dfdbe

### Responsividade

https://github.com/user-attachments/assets/8a818b13-ac03-4687-8221-aa2fffe87b24


### 🆕 Página para cadastro de usuários

Agora os funcionários podem ter um login e acompanhar o histórico das suas férias.

<img src="./doc/screenshots/create-user.jpg" alt="Página para cadastro de usuários">


