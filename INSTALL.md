# INSTALL

### Requerimientos del server

- __[NodeJS](https://nodejs.org/es/download/)__: 8.11.2 LTS


### Clonado del proyecto:

    git clone git@gitlab.com:diegocomesana/ml-test.git


### Hacer nuevo build del front/client:

    /client$ yarn build

En caso de requerir cambiar el host de la API el el front:

- Abrir __/client/src/packages/ml/logic.js__
- Cambiar el valor de la constante __API_URL__
- Hacer nuevo build del front/client

### Iniciar la aplicación con __NodeJS__:

- No hace falta hacer un nuevo build del front/client (se puede usar actual)

    Instalar las dependencias:

        /server$ yarn

    Para cambiar el puerto (8080):

    - Abrir __/server/.env__
    - Cambiar el valor de __APP_PORT__

    Iniciar Express:

        /server$ yarn start
        o
        /server$ yarn watch

### Iniciar la aplicación desde imagen de __Docker Hub__:

- No se requiere __NodeJS__ 

        docker pull diegocomesana/ml-test

        docker run -it -d -p 80:8080 diegocomesana/ml-test
