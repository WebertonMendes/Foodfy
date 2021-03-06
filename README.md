![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/main/public/assets/logo_black.png)
<br>
##### Aplicação desenvolvida durante o curso Launchbase da <a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a> (Projeto final de conclusão do curso).

### Projeto desenvolvido com:
`HTML` `CSS` `JS` `NodeJS` `Express` `Nunjucks` `NodeMailer` `Multer` `BcryptJS` `PostgreSQL`
<br>
#### Instalando a aplicação:

*Antes de prosseguir é necessário possuir o NodeJS e o Postgres instalados.*

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
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy01_MailtrapData.png)<br>

**8º Passo:** Alterar o arquivo mailer.js para envio de email:
```sh
user: "user_mailtrap",
pass: "password_mailtrap"
```

**9º Passo:** Adicionar dados Faker para a aplicação: (opcional)
```sh
$ node seeds.js
```

**10º Passo:** Iniciar a aplicação:
```sh
$ npm start
```
<br>

*Usuário Administrador Padrão*<br>
```sh
$ Usuário: admin@foodfy.com.br
$ Senha: admin
```
<br>

### Telas da Aplicação

> Página Home<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy02_Home.png)<br>

> Página Sobre<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy03_About.png?raw=true)<br>

> Página de Receitas<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy04_SiteRecipes.png?raw=true)<br>

> Página de Chefs<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy05_SiteChefs.png?raw=true)<br>

> Página de Login<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy06_Login.png?raw=true)<br>

> Página de solicitação de recuperação de senha<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy07_Recover.png?raw=true)<br>

> Email de recuperação de senha<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy08_RecoverMail.png?raw=true)<br>

> Página de recuperação de senha<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy09_Recovery.png?raw=true)<br>

> Email com dados de acesso para Novos Usuários<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy10_NewUser.png?raw=true)<br>

> Página de Administração de Receitas - Listagem<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy11_AdminRecipesList.png?raw=true)<br>

> Página de Administração de Receitas - Detalhes<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy12_AdminRecipesShow.png?raw=true)<br>

> Página de Administração de Receitas - Edição<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy13_AdminRecipesEdit.png?raw=true)<br>

> Página de Administração de Chefs - Listagem<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy14_AdminChefsList.png?raw=true)<br>

> Página de Administração de Chefs - Detalhes<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy15_AdminChefsShow.png?raw=true)<br>

> Página de Administração de Chefs - Edição<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy16_AdminChefsEdit.png?raw=true)<br>

> Página de Administração de Usuários - Listagem<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy17_AdminUsersList.png?raw=true)<br>

> Página de Administração de Usuários - Edição<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy18_AdminUsersEdit.png?raw=true)<br>

> Página de Administração de Perfil<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy19_AdminProfile.png?raw=true)<br>

> Mensagens de sucesso e erro da aplicação<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy20_SuccessMessages.png?raw=true)<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy21_ErrorMessages.png?raw=true)<br>

> Página de Erro 404 (Página não encontrada)<br>
![](https://raw.githubusercontent.com/WebertonMendes/Foodfy/master/screen/Foodfy22_Error404.png?raw=true)<br>