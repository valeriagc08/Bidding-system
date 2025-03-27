# Bidding System

Este proyecto es un sistema de subastas dividido en dos servicios, uno para manejar las subastas (`manager-service`) y otro para la funcionalidad de los postores (`bidder-service`). El frontend utiliza **React**, mientras que el backend utiliza **Node.js** con **Express**. La comunicación en tiempo real se maneja mediante **WebSockets**, mientras que el resto de la aplicación usa **REST API**.

## Arquitectura del Software

1. **Servicios**:
   - **Manager Service**: Maneja las subastas y su lógica.
   - **Bidder Service**: Permite a los usuarios pujar en las subastas.

2. **Tecnologías**:
   - **Backend**: Node.js con Express.
   - **Frontend**: React.
   - **WebSockets**: Usado para actualizaciones en tiempo real.
   - **Docker**: Ambos servicios se ejecutan en contenedores Docker.

3. **Contenedores**:
   Los dos servicios se ejecutan en **contenedores Docker** para facilitar la implementación y la ejecución en cualquier entorno.

## Cómo correr la aplicación

### Requisitos previos

1. Asegúrate de tener **Docker** y **Docker Compose** instalados en tu sistema.
2. Si deseas correr el frontend localmente, asegúrate de tener **Node.js** y **npm** instalados.

### Paso 1: Clonar este repositorio

Si aún no has clonado el repositorio, puedes hacerlo con el siguiente comando:

git clone https://github.com/valeriagc08/Bidding-system.git cd repo


### Paso 2: Usando Docker Compose

Para levantar los dos servicios utilizando **Docker Compose**, sigue estos pasos:

1. Abre una terminal y navega al directorio donde tienes el archivo `docker-compose.yml`.

2. Ejecuta el siguiente comando para levantar los servicios:

`docker-compose up`


Este comando descargará las imágenes necesarias y ejecutará los contenedores para el **manager-service** y el **bidder-service**. Los contenedores estarán disponibles en los siguientes puertos:

- **Manager Service**: `http://localhost:8080`
- **Bidder Service**: `http://localhost:8081`

### Paso 3: Corriendo el frontend localmente

Si prefieres correr el frontend localmente, sigue estos pasos:

1. Navega a la carpeta `frontend`:

`cd frontend`


2. Instala las dependencias:

`npm install`

3. Luego, ejecuta el servidor de desarrollo:

`npm start`


Esto iniciará el frontend en el navegador en `http://localhost:3000`.

### Paso 4: Corriendo las imágenes desde Docker Hub (opcional)

Si prefieres usar las imágenes de Docker Hub directamente, puedes correr los contenedores con los siguientes comandos:

1. Para el **Manager Service**:

`docker run -d --name bidding-system-manager mafuertes/bidding-system:manager`


2. Para el **Bidder Service**:

`docker run -d --name bidding-system-bidder mafuertes/bidding-system:bidder`

```
Bidding-system/
│
├── bidder-service/       # Código del servicio de postores
├── frontend/             # Código fuente de la aplicación frontend (React)
│   ├── node_modules/     # Dependencias de npm
│   ├── public/           # Archivos estáticos (HTML, iconos, etc.)
│   └── src/              # Componentes y lógica de React
│
├── manager-service/      # Código del servicio de manejo de subastas
│   ├── node_modules/     # Dependencias de npm
│   └── ...               # Archivos de configuración y lógica del backend
│
└── docker-compose.yml    # Configuración de Docker Compose para levantar los servicios
```