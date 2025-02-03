# Wallet Monorepo

Este es un monorepo que contiene tres proyectos: `wallet-core`, `wallet-gateway` y `app`, los cuales forman parte de una plataforma de billetera virtual.

## Estructura del Proyecto

1. **wallet-core**: 
   - Backend que interactúa directamente con la base de datos.
   - Utiliza Mongoose como ORM para la base de datos MongoDB.
   - Provee funcionalidades de registro de cliente, carga de dinero a la billetera, confirmación de pagos y consulta de saldo.

2. **wallet-gateway**: 
   - Backend que actúa como puente entre el `wallet-core` y el frontend.
   - Utiliza Axios para comunicarse con el backend `wallet-core`.

3. **app**:
   - Frontend de la plataforma, construido en ReactJS.
   - Aquí es donde los usuarios interactúan con la billetera virtual.

4. **libs**:
   - Contiene configuraciones compartidas entre los dos backends (conexión a la base de datos, modelos y interfaces).

## Requisitos

- Node.js (versión 16 o superior).
- npm (gestor de paquetes de Node.js).
- Base de datos MongoDB.

## Instalación y Ejecución

Para correr el proyecto por primera vez, sigue los siguientes pasos:

1. Clona el repositorio y navega al directorio raíz del monorepo:
    ```bash
    cd /wallet-monorepo
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Una vez que todas las dependencias estén instaladas, ejecuta el siguiente comando para levantar el proyecto:
    ```bash
    npm run dev
    ```

4. Dirígete a [http://localhost:4200/](http://localhost:4200/) en tu navegador para empezar a usar la plataforma de billetera.

## Descripción del Proyecto

Este proyecto simula una billetera virtual. A continuación se detallan las funcionalidades implementadas:

### 1. Registro de Cliente
- Se puede registrar un cliente proporcionando:
  - Documento
  - Nombres
  - Email
  - Celular
- El servicio devuelve un mensaje de éxito o fallo dependiendo de la validación.

### 2. Recarga de Billetera
- Permite cargar dinero a la billetera proporcionando:
  - Documento
  - Número de celular
  - Valor de la recarga
- El sistema responde con un mensaje de éxito o fallo.

### 3. Pago con Billetera
- Si la billetera tiene saldo suficiente, se puede realizar un pago.
- El sistema genera un token de 6 dígitos que se envía al email del usuario para confirmación.
- El pago solo se realiza si el token enviado es validado correctamente.

### 4. Consulta de Saldo
- Se puede consultar el saldo de la billetera proporcionando:
  - Documento
  - Número de celular
- Estos dos valores deben coincidir con los registrados.

## API Documentation

Toda la documentación de los servicios involucrados en la billetera virtual está disponible en la siguiente colección de Postman:

[API Documentation - Postman Collection](https://iciva-fk2go.postman.co/workspace/test-wallet~6ef26097-315a-4fcd-bfbc-680db60c7e07/collection/2137361-72251983-6b03-418b-a245-426d2b96350f?action=share&creator=2137361&active-environment=2137361-e7570b57-4d19-4c7d-b819-7b06e1e9b3d2)

## Tecnologías Utilizadas

- **Backend**: ExpressJS
- **Base de Datos**: MongoDB con Mongoose (para el `wallet-core`)
- **Frontend**: ReactJS
- **Otros**: Axios (para la comunicación entre el frontend y el backend)
  
## Buenas Prácticas

- Se ha seguido un enfoque basado en buenas prácticas de desarrollo de software.
- La base de datos solo es accesible a través del servicio que se conecta directamente con ella (el servicio `wallet-core`).
- Se ha usado un ORM (Mongoose) para interactuar con la base de datos.

## Recomendaciones

- Se recomienda mantener la base de datos y el entorno de desarrollo bien configurados.
- Si tienes problemas para ejecutar el proyecto, asegúrate de tener las versiones correctas de Node.js y npm instaladas.

---

¡Gracias por usar Wallet Monorepo! Si tienes algún problema o sugerencia, no dudes en abrir un issue en el repositorio.
