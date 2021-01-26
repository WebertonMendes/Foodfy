# Foodfy

![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/main/public/assets/logo_black.png)
<br>
##### Aplicação desenvolvida durante o curso Launchbase da <a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a> (Projeto final de conclusão do curso).

### Projeto desenvolvido com:
`HTML` `CSS` `JS` `NodeJS` `Express` `Nunjucks` `NodeMailer` `Multer` `BcryptJS` `PostgreSQL`
<br>
#### Instalando a aplicação:

**1º Passo:** Download do repositório:
```sh
$ git clone "https://github.com/WebertonMendes/Foodfy.git"
```

**2º Passo:** Executar o script SQL no banco de dados para criação das tabelas:
```sh
$ database.sql
```

**3º Passo:** Executar a instalação dos pacotes:
```sh
$ npm install
```

**4º Passo:** Renomear o arquivo de conexão ao banco de dados:
```sh
$ mv src/config/db_example.js src/config/db.js
```

**5º Passo:** Alterar o arquivo de conexão ao banco de dados:
```sh
user: "user_db",
password: "password_db",
host: "localhost_or_ip_db",
port: 5432,
database: "name_db"
```

**Para envio de emails foi utilizado o Mailtrap: https://mailtrap.io/signin**<br>

**6º Passo:** Após criar a conta no Mailtrap, renomear o arquivo mailer para envio de email:
```sh
$ mv src/lib/mailer_example.js src/lib/mailer.js
```

**7º Passo:** Alterar o arquivo mailer.js para envio de email:
```sh
user: "user_mailtrap",
pass: "password_mailtrap"
```

**8º Passo:** Iniciar a aplicação:
```sh
$ npm start
```
<br>

### Telas da Aplicação

> Página Home
![]()<br>

> Página Sobre
![]()<br>

> Página de Receitas
![]()<br>

> Página de Chefs
![]()<br>

> Página de Login
![]()<br>

> Página de solicitação de recuperação de senha
![]()<br>

> Página de recuperação de senha
![]()<br>

> Página de Administração de Receitas
![]()<br>

> Página de Administração de Chefs
![]()<br>

> Página de Administração de Usuários
![]()<br>

> Página de Administração de Perfil
![]()<br>

> Mensagens de sucesso e erro da aplicação
![]()<br>