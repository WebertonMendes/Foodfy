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

**6º Passo:** Dentro do diretório "public" crie o sub-diretório "images" para salvar as imagens cadastradas na aplicação.
<br>

**Para envio de emails foi utilizado o Mailtrap: https://mailtrap.io/signup**<br><br>
**7º Passo:** Após criar a conta no Mailtrap, renomear o arquivo mailer para envio de email:
```sh
$ mv src/lib/mailer_example.js src/lib/mailer.js
```

(Encontre os dados do Mailtrap conforme o print abaixo)
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy01_MailtrapData.png?raw=true)<br>

**8º Passo:** Alterar o arquivo mailer.js para envio de email:
```sh
user: "user_mailtrap",
pass: "password_mailtrap"
```

**9º Passo:** Adicionar dados Faker para a aplicação: (opcional)
```sh
$ node seed.js
```

**10º Passo:** Iniciar a aplicação:
```sh
$ npm start
```
<br>

### Telas da Aplicação

> Página Home
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy02_Home.png?raw=true)<br>

> Página Sobre
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy03_About.png?raw=true)<br>

> Página de Receitas
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy04_SiteRecipes.png?raw=true)<br>

> Página de Chefs
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy05_SiteChefs.png?raw=true)<br>

> Página de Login
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy06_Login.png?raw=true)<br>

> Página de solicitação de recuperação de senha
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy07_Recover.png?raw=true)<br>

> Email de recuperação de senha
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy08_RecoverMail.png?raw=true)<br>

> Página de recuperação de senha
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy09_Recovery.png?raw=true)<br>

> Email com dados de acesso para Novos Usuários
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy10_NewUser.png?raw=true)<br>

> Página de Administração de Receitas
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy11_AdminRecipes.png?raw=true)<br>

> Página de Administração de Chefs
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy12_AdminChefs.png?raw=true)<br>

> Página de Administração de Usuários
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy13_AdminUsers.png?raw=true)<br>

> Página de Administração de Perfil
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy14_AdminProfile.png?raw=true)<br>

> Mensagens de sucesso e erro da aplicação
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy15_SuccessMessages.png?raw=true)<br>
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy16_ErrorMessages.png?raw=true)<br>

> Página de Erro 404 (Página não encontrada)
![](https://github.com/WebertonMendes/Foodfy/blob/master/screen/Foodfy17_Error404.png?raw=true)<br>