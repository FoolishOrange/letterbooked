📄 Product Requirements Document (PRD) - LoreShelf
1. Visão Geral e Objetivo

O LoreShelf é uma aplicação web didática voltada para descoberta e organização de livros. O sistema permite que o usuário pesquise livros através de uma API pública, visualize informações sobre as obras e salve seus livros favoritos em uma biblioteca pessoal.

O grande diferencial (Regra de Negócio Principal): O LoreShelf permite que o usuário crie sua própria coleção de livros favoritos de forma simples, utilizando os dados obtidos através da API pública Open Library e armazenando localmente os livros selecionados.

O objetivo do sistema é proporcionar uma interface simples para descobrir novas obras e organizar livros que o usuário deseja ler ou consultar posteriormente.

2. Atores do Sistema
Visitante: Usuário que acessa o LoreShelf, pesquisa livros, visualiza seus detalhes e pode adicionar obras aos favoritos.
O Sistema: Responsável por realizar as pesquisas na API pública, apresentar os dados dos livros e gerenciar a lista de favoritos armazenada localmente.
3. Histórias de Usuário e Escopo

Abaixo estão as funcionalidades principais do MVP (Minimum Viable Product), escritas sob a perspectiva do usuário final.

🔎 Épico 1: Pesquisa e Exploração
US01 - Pesquisar Livros: Como um Visitante, quero pesquisar livros por título, autor ou palavra-chave para encontrar obras que sejam do meu interesse.
Critérios de Aceitação: O usuário deve poder inserir um termo de pesquisa; o sistema deve realizar uma requisição à API Open Library; os resultados devem ser apresentados em cards; caso nenhum resultado seja encontrado, uma mensagem informativa deve ser exibida.
US02 - Explorar Livros: Como um Visitante, quero visualizar livros apresentados na página inicial para descobrir novas obras sem precisar realizar uma pesquisa específica.
Critérios de Aceitação: A página inicial deve apresentar uma seleção de livros e permitir que o usuário acesse seus detalhes.
📖 Épico 2: Informações dos Livros
US03 - Visualizar Detalhes: Como um Visitante, quero selecionar um livro para visualizar suas principais informações.
Critérios de Aceitação: A página de detalhes deve apresentar, quando disponíveis, capa, título, autor, descrição, ano de publicação, número de páginas e idioma.
US04 - Voltar para a Pesquisa: Como um Visitante, quero retornar à página de exploração depois de visualizar um livro para continuar pesquisando outras obras.
❤️ Épico 3: Biblioteca de Favoritos
US05 - Adicionar aos Favoritos: Como um Visitante, quero adicionar um livro aos meus favoritos para poder encontrá-lo novamente posteriormente.
Critérios de Aceitação: O livro deve ser adicionado à biblioteca de favoritos e permanecer salvo mesmo após o fechamento ou atualização da página.
US06 - Remover dos Favoritos: Como um Visitante, quero remover um livro dos meus favoritos quando não quiser mais mantê-lo na minha biblioteca.
Critérios de Aceitação: O livro deve ser removido da lista de favoritos e não deve mais aparecer na biblioteca pessoal.
US07 - Visualizar Favoritos: Como um Visitante, quero visualizar todos os livros que favoritei em uma única página para consultar minha biblioteca pessoal.
Critérios de Aceitação: A página deve apresentar os livros salvos pelo usuário e, caso não existam favoritos, deve informar que a biblioteca está vazia.# 📄 Product Requirements Document (PRD) - Roubank

## 1. Visão Geral e Objetivo

O **Roubank** é uma aplicação web didática que simula as operações básicas de uma instituição financeira (abertura de conta, depósitos, saques e extratos).

**O grande diferencial (Regra de Negócio Principal):** Ao contrário dos bancos tradicionais modernos, o Roubank cobra **taxas abusivas** para absolutamente qualquer operação que o cliente realize. O objetivo do sistema é registrar as movimentações financeiras do usuário sempre subtraindo uma porcentagem ou valor fixo sob o pretexto de "taxas de manutenção" ou "impostos do banco".

## 2. Atores do Sistema

- **Visitante:** Usuário não autenticado que acessa a página inicial e deseja abrir uma conta.
- **Cliente:** Usuário autenticado que possui saldo (ou dívidas) no banco e realiza operações financeiras.
- **O Banco (Sistema):** Ator invisível que aplica as regras de negócio e desconta as taxas automaticamente a cada transação do Cliente.

## 3. Histórias de Usuário e Escopo

Abaixo estão as funcionalidades principais do MVP (Minimum Viable Product), escritas sob a perspectiva do usuário final.

### 👤 Épico 1: Autenticação e Conta

- **US01 - Abertura de Conta:** Como um Visitante, quero preencher um formulário com meus dados pessoais (Nome, CPF, Senha) para criar uma nova conta no Roubank.
  - _Critérios de Aceitação:_ O CPF deve ser validado; todos os campos são obrigatórios; a conta deve iniciar com saldo R$ 0,00.
- **US02 - Acesso ao Sistema (Login):** Como um Cliente, quero inserir meu CPF e Senha para acessar meu painel financeiro.

### 💰 Épico 2: Movimentações Financeiras

- **US03 - Visualização de Saldo:** Como um Cliente logado, quero ver meu saldo total atualizado em destaque no painel principal, para saber quanto dinheiro (ainda) tenho.
- **US04 - Realizar Depósito:** Como um Cliente, quero informar um valor para depositar na minha conta.
  - _Critérios de Aceitação:_ O valor deve ser positivo; o sistema deve cobrar uma **"Taxa de Depósito" (ex: 2% do valor)** e creditar apenas o valor líquido na conta do cliente.
- **US05 - Realizar Saque:** Como um Cliente, quero informar um valor para sacar da minha conta.
  - _Critérios de Aceitação:_ O cliente não pode sacar mais do que o saldo disponível + limite; o sistema deve cobrar uma **"Taxa de Saque" (ex: R$ 5,00 fixos por saque)**, descontando o valor do saque + a taxa do saldo total.

### 📊 Épico 3: Histórico e Transparência

- **US06 - Visualizar Extrato:** Como um Cliente, quero visualizar uma lista (tabela ou cards) com o histórico de todas as minhas transações (depósitos e saques).
  - _Critérios de Aceitação:_ A lista deve mostrar a data, o tipo de transação, o valor bruto e **o valor da taxa cobrada** pelo Roubank, deixando claro o quanto o cliente perdeu na operação.
