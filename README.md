# Trabalho_1_Web_Avancada

Primeiramente, após realizar a instalação dos arquivos deste repositório, utilize **npm install** para instalar os arquivos faltantes.

//criar o arquivo '.env' e preencher nele:

STAGE='test'

PORT='3000'

HOST='127.0.0.1'

JWT_SECRET='Abcd@1234'

DB_URL='mongodb://localhost:27017/dositio'



//coisas do thunder
http://127.0.0.1:3000/products

http://127.0.0.1:3000/categories

Para pegar o "x-access-token", mude para "http://127.0.0.1:3000/auth" e de "GET" para "POST",
depois, selecione "Body" e preencha com
{
  "username":"arthur",
  "password":"Abcd@1234"
}


Postar o "x-acces-token" no Header que aí tem permissão para modificar
para o "DELETE", só colocar o id na frente.
para o POST, tem que modificar o body (não precisa por o ID na hora de preencher)
