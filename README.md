Esse projeto foi desenvolvido utilizando Node.js no backend e ReactJS no frontend.

Para rodar o ambiente, é necessário que Docker (opcional), Yarn e Node.js já estejam configurados.

## Configurando o ambiente
Antes de tudo, é necessário criar um banco de dados PostgresSQL para continuar.

#### Banco de dados PostgresSQL no Docker
1. Crie um container (caso já não esteja criado):
`docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
	1. Note que `database` é o nome do container, e pode ser substituído por qualquer nome de preferência.
	2. Além disso, o parâmetro `POSTGRES_PASSWORD` é relativo à senha utilizada para acessar os bancos do container, portanto pode ser substituído também.
	3. O usuário por padrão é postgres

2. Depois o inicie com:
`docker start database`

3. Inicialize um banco de dados vazio no container (de preferência com o nome *bellafaces*)

4. Na raiz do backend, renomeie o arquivo **.env.example** para somente **.env**
	1. Abra ele e modifique os parâmetros  `DB_HOST`, `DB_PASS`,`DB_USER` e `DB_NAME` para os dados de conexão corretos do seu banco de dados.

## Configuração do backend
1. Na pasta raiz do backend, rode o comando `yarn` para que o gerenciador de pacote baixe todas as dependências do projeto.

2. Ainda na raiz do backend, é necessário rodar as migrations e seeds para respectivamente criar as tabelas do banco, e inserir os dados de demonstração.
	1. Rode `yarn sequelize db:migrate` para executar todas as migrations
	2. `yarn sequelize db:seed:all` para seedar o banco de dados.
	Isso preencher as tabelas de produtos e usuário com dados demonstração.

3. Após isso, rode `yarn start` para iniciar o projeto (o mesmo será inicializado na porta 3333)

## Configuração do frontend
1. Na pasta raiz do frontend, rode `yarn` para baixar todas as demais dependências.
2. Rode `yarn start` para inicializar a aplicação

##	O login e senha do cliente pré-inserido são:
**Usuário:** rl.catarinense
**Senha:** 123456teste
