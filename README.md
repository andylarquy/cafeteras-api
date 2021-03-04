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

## Bonus

### Configurar un linter
El primer paso es agregar la dependencia de ```eslint``` (que es el linter usado por estandar hoy en día en node):
```
npm install -D eslint
```
Luego podemos correr el comando ```npx eslint --init``` para seguir los pasos de configuracion que nos propone eslint, yo sugiero ir por una vía más rudiementaria y crear un archivo llamado ```.eslintrc.json``` con el siguiente contenido:
```json
{
    "env": {
        "browser": true,
        "node": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "semi": ["error", "never"],
        "quotes": ["warn", "single"]
    }
}
```

### Usar variables de entorno
Cuando desarrollamos hay ciertos parametros que pueden llegar a variar con el tiempo, o hay cierta información que preferimos mantener confidencial (credenciales, url's, puertos, etc.).
Para hacer esto se emplean las [variables de entorno](https://es.wikipedia.org/wiki/Variable_de_entorno). Las variables de entorno son variables del sistema opertaivo que pueden ser accedidas por cualquiera desde cualquier parte, y lo mas importante es que son suceptibles de ser modificadas, con lo cual si el día de mañana cambian unas credenciales o una url no es necesario compilar una nueva version de la aplicacion, simplemente se modifica la variable de entorno necesaria en el servidor y la vida sigue.
El problema es que configurar las variables de entorno a mano una por una cada vez que se quiere desarrollar puede ser bastante doloroso. Por fortuna existen herramientas como [dotenv](https://www.npmjs.com/package/dotenv) que nos facilitan la vida.

Vamos a usar ```dotenv``` para cargar la variable que determina el puerto donde se va a levantar la aplicación. Para ello el primer paso será instalar dotenv con el siguiente comando:
```
npm i dotenv
```
(Si nos ponemos exquisitos esta tendría que ser una dependencia de desarrollo, como tarea te dejo investigar los problemas que surgen y cómo se solucionan).

Una vez que tenemos la dependencia deberemos crear el archivo ```.env``` en el directorio raiz. **Es muy importante asegurarnos de actualizar el archivo .gitignore, si cometemos el error de subir al repositorio este archivo cometeríamos una grave infracción de seguridad.** La forma más segura de garantizar que no se cometerá nunca este error es agregar lo siguiente al archivo .gitignore:
```
**/*.env
``` 
De esta forma lo que decimos es "Sin importar en que directorio ni como se llame el archivo, cualquier archivo que termine en '.env' debe ser excluido.

El proximo paso será completar las variables de entorno dentro de este archivo, en nuestro caso de la siguiente manera:
```
PORT=4848
```

Luego habrá que modificar nuestro código para utilizar esta biblioteca.
Para hacerlo deberemos escribir en la primera linea de ejecucion de nuestro código lo siguiente:
``` javascript
require('dotenv').config()
```

Adicionalmente reemplazaremos todas las definiciones de ```4848``` por una llamada a la variable de entorno del sistema. En node esto se hace con ```process.env.NOMBRE_DE_LA_VARIABLE```.
De forma que modificaremos esta linea ```const port = 4848``` para que sea ```const port = process.env.PORT```.
Reiniciamos el servidor para que se apliquen los cambios y todo debería estar listo.