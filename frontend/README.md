# 🏰 Enciclopédia Mágica Disney

## ✨ Visão Geral do Projeto

A **Enciclopédia Mágica Disney** é uma aplicação web desenvolvida em React que permite aos usuários explorar e pesquisar um vasto catálogo de personagens do universo Disney. O projeto foi construído com foco em uma experiência de usuário fluida e visualmente atraente, utilizando o Material-UI (MUI) para um design responsivo e moderno.

A aplicação consome a [Disney API](https://api.disneyapi.dev/) para buscar dados em tempo real e apresenta os resultados em uma grade de cards estilizada.

---

## 🚀 Tecnologias Utilizadas

| Categoria | Tecnologia | Versão | Descrição |
| :--- | :--- | :--- | :--- |
| **Frontend** | **React.js** | ^18.x | Biblioteca principal para construção da interface de usuário. |
| **Build Tool** | **Vite** | Latest | Ferramenta de build rápida e leve. |
| **Estilização** | **Material-UI (MUI)** | ^5.x | Biblioteca de componentes React para um design de material. |
| **Estado** | **Context API** | N/A | Gerenciamento de estado (busca, carregamento, resultados) de forma centralizada. |
| **Linguagem** | **JavaScript** | ES6+ | Linguagem de programação principal. |

---

## 🛠️ Como Rodar a Aplicação Localmente

Siga estas instruções para configurar e executar o projeto em sua máquina.

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão LTS ou superior) e o npm/yarn instalados.

### Instalação e Execução

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/Thakirian/Disney-pedia.git](https://github.com/Thakirian/Disney-pedia.git)
    cd Disney-pedia
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    # ou
    # yarn install
    ```

3.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    # ou
    # yarn dev
    ```

4.  **Acesse:** A aplicação estará disponível em seu navegador no endereço `http://localhost:5173` (ou a porta indicada pelo Vite).

---

## 🔍 Funcionalidades

* **Busca de Personagens:** Campo de pesquisa eficiente que consulta a Disney API em tempo real.
* **Grid Responsivo:** Layout de cards que se adapta perfeitamente a qualquer tamanho de tela (mobile, tablet e desktop).
* **Componentes de Feedback:** Exibição de *loading* (`<CircularProgress>`), mensagens de erro (`<Alert>`) e notificação de "Nenhum Resultado Encontrado".
* **Design Consistente:** Tema customizado do Material-UI com cores inspiradas na Disney para um visual mágico.
* **Tratamento de Erros de Imagem:** Utiliza *fallback* (imagem de substituição) para URLs de imagens quebradas fornecidas pela API.

---

## 🤝 Colaboradores

Este projeto foi resultado de uma colaboração focada em especialização de frontend e backend.

| Colaborador | Foco Principal | Contato |
| :--- | :--- | :--- |
| **Giovana Kaori** | **Frontend (Interface e Estilização)**: MUI, Responsividade, Tema, Componentes de Card/Barra de Busca. | https://github.com/giovanakaoriparpinelli |
| **Thaisse Kirian** | **Lógica e Dados (Context API)**: Implementação da função de busca na API, gerenciamento de estados (`carregando`, `erro`, `personagens`) via Context API. | https://github.com/Thakirian |

---

## 📝 Deploy

Este projeto está disponível no link https://giovana.kaori.parpinelli.github.io/Disney-pedia/.
