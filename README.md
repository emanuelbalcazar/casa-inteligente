# casa-inteligente
Desarrollo para el final de la materia de Fundamentos Teoricos de la Informatica.

## Requisitos previos

Instalar Node.js:
* `sudo apt-get install -g npm`.
* `sudo apt-get install node`.

Instalar Bower:
* `sudo npm install -g bower`.

Tener instalado MongoDB:
* `corriendo en el puerto 2701 (puerto por defecto)`.

## Despliegue

1. Clonar el repositorio: `https://emanuelbalcazar@bitbucket.org/emanuelbalcazar/casa-inteligente.git`.
2. Cambiar directorio: `cd casa-inteligente`.
3. Ejecutar: `npm install`.
4. Ejecutar: `bower install`.
5. Verificar la conexión a mongodb en `./config/database.json`. 
6. Ejecutar la aplicación usando: `node run.js` o `npm start`.
7. Visualizar la aplicación en `localhost:8000`, según esta definido en `./config/app.json`.