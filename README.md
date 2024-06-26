## Aluno: Arthur Trevizani Buback
## Disciplina: Programação Avançada para WEB
## Turma: CC5Mb
## Docente: Wagner de Andrade Perin

Primeiramente, após realizar a instalação dos arquivos deste repositório, utilize "**npm install**" para instalar os arquivos faltantes.

Também é necessário criar o arquivo "**.env**" e preencher nele as seguintes informações:
```
STAGE='test'
PORT='3000'
HOST='127.0.0.1'
JWT_SECRET='Abcd@1234'
DB_URL='mongodb://localhost:27017/dositio'
```

Por fim, utilizamos "**npm run dev**" para inicializarmos o servidor.

Para utilizar vários comandos do servidor, necessitamos do "**x-access-token**", e para adquiri-lo, precisarmos alterar a "**URL**" para "http://127.0.0.1:3000/auth" e o "GET" para "POST"; depois, selecionar "Body" e preencher com
```
{
  "username":"arthur",
  "password":"Abcd@1234"
}
```
Quando isto for feito, selecionamos "Headers" e preenchemos "header" com "x-access-token" e "value" com o conjunto de letras que adiquirimos.

Agora, podemos realizar alguns comandos que não poderiamos anteriormente.

##Algumas informações extras de como utilizar o Thunder Client:

"**http://127.0.0.1:3000/products**" para utilizar comandos em "Produtos"

"**http://127.0.0.1:3000/categories**" para utilizar comandos em "Categorias"

Para utilizar o comando "**DELETE**", precisamos por o id na frente.

Para utilizar o comando "**POST**", devemos modificar o body também.
