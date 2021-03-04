# Cafeteras API

## Introduccion
En este ejemplo voy a detallar el paso a paso para crear una API REST en ```javascript``` con ```express```.

## Requisitos
Es preciso contar con ```Node.js``` y un package manager (yarn o npm, yo voy a usar npm).

## Pasos
### Iniciar el proyecto de node
Para iniciar un proyecto de node con npm podes correr el comando:
```
npm init
```
Y seguir el paso a paso. 
Se debería generar un archivo ```package.json```.

### Instalar las dependencias
Para poder iniciar un proyecto en node es necesario instalar las dependencias necesarias.
Vamos a empezar por las dependencias necesarias en produccion:
```
npm i node express
```

Y luego las dependencias adicionales de desarrollo:
```
npm i -D nodemon
```

### Iniciar el codigo fuente
Vamos a crear una carpeta en el directorio raíz del proyecto llamada ```src``` donde va a vivir el codigo.
Adentro vamos a crear un archivo ```index.js``` y vamos a pegar lo siguiente:
``` javascript
const express = require('express')
const app = express()
const port = 4848

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
```
(Ejemplo tomado de la [documentacion de express](https://expressjs.com/es/starter/hello-world.html)).

### Setup del proyecto
Para poder ejecutar nuestro proyecto va a ser necesario hacer algunos cambios en el ```package.json```.
Primero vamos a editar la propiedad ```"main"``` para que quede asi:
```
"main": "src"
```

Luego vamos a editar la propiedad ```"scripts"``` para que quede como la siguiente:
``` json
"scripts": {
    "dev": "nodemon index.js",
    "run": "node index.js"
    }
```

### Correr el proyecto
Para correr este proyecto mientras desarrollamos hay que usar el comando:
```
npm run dev
```

Si fuesemos a correrlo en una instancia en produccion deberiamos usar el comando:
```
npm run build
```
