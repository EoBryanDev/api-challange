# API Challange - Persistência dos Dados

Este projeto foi criado para complementar as operações realizadas pela interface do cliente(frontend).
Para analisar a interface acesse [Front-end API-Challange](https://github.com/EoBryanDev/front-end-api-challange)

## Descrição do Projeto

Utilizei o NodeJS para fazer apenas duas rotas. Uma que se comunica com o banco de dados e retorna os seus registros e outra rota que envia dados a serem persistidos. Para apresentar uma interface simples ao usuário retornei uma página html para redirecionar o usuário a rota de pesquisa.

### Rota de Pesquisa(GET): `<http://localhost:3001/db>`

Nesta rota é retornado todos os dados registrados na coleção do MongoDB Atlas.

### Rota de Registro(POST): `<http://localhost:3001/db>`

Nesta rota é enviado o comando de inserção de dados através do modelo realizado a partir do Mongoose. Desta forma levando um objeto com nome e data de nascimento.

## Notas finais

Para fazer a comunicação e requisições com o banco de dados utilizei a biblioteca mongoose.
Para realizar a proteção dos dados sensíveis utilizei o módulo dotenv deixando as variáveis db_user e db_pass protegidas.
