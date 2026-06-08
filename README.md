# TodoList Web Application

Aplicación de gestión de tareas (TODO List) con autenticación JWT, construida con **Node.js + Express** en el backend y **React** en el frontend.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados:

- **Node.js** (versión 14 o superior) - [Descargar](https://nodejs.org/)
- **npm** (viene con Node.js)
- **MongoDB** (versión 4.4 o superior)
  - **Opción Local**: [Descargar MongoDB Community](https://www.mongodb.com/try/download/community)
  - **Opción Cloud**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (recomendado para pruebas rápidas)
- **Git** - [Descargar](https://git-scm.com/)
- **mkcert** (para generar certificados SSL/TLS locales) - [Instrucciones](https://github.com/FiloSottile/mkcert)

## Instalación y Despliegue en Localhost

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/Jaodeivid/todoListWeb.git
cd todoListWeb
```

### Paso 2: Configurar Variables de Entorno

**Recomendación:** Usa Opción A para desarrollo rápido. Usa Opción B para probar comportamientos específicos de HTTPS en el frontend.

#### 2A. Crear archivo `.env` en la carpeta `backend/`

```bash
cd backend
# En Windows
copy .env.example .env

# En macOS/Linux
cp .env.example .env
```

**Editar el archivo `backend/.env` con tus valores:**

```env
# Puerto del servidor (por defecto 3000)
PORT=3000

# Conexión a MongoDB
# Opción 1 - Local (si tienes MongoDB instalado localmente)
MONGODB=mongodb://localhost:27017/todolistweb

# Opción 2 - MongoDB Atlas (nube)
# MONGODB=mongodb+srv://usuario_real:contraseña_real@cluster0.mongodb.net/todolistweb
# Reemplazar: usuario_real, contraseña_real, cluster0 con tus datos

# Clave secreta para JWT (genera una segura)
JWT_SECRET=TuClaveSecretaDeAlMenos32CaracteresParaSerSegura123456
```

**Para generar una clave segura para JWT:**

```bash
# En macOS/Linux(terminal de git)
openssl rand -base64 32

# O simplemente usa una cadena manual segura:
JWT_SECRET=TuClaveSeguraDeAlMenos32CaracteresAqui123456
```

#### 2B. (Opcional - Solo si deseas HTTPS en el Frontend) Crear archivo `.env` en la carpeta `frontend/`

**Crea un archivo `frontend/.env` con el siguiente contenido:**

```env
PORT=3001
HTTPS=true
SSL_CRT_FILE=cert.pem
SSL_KEY_FILE=key.pem
```

**Cómo crear el archivo:**
- **Windows:** Abre un editor de texto, pega el contenido, guarda como `.env` en la carpeta `frontend/`
- **macOS/Linux:** Crea el archivo con `nano frontend/.env` o `vi frontend/.env`

### Paso 3: Instalar MongoDB (Si es Necesario)

#### Opción A: MongoDB Local (Windows)

1. [Descargar MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Ejecutar el instalador y seguir los pasos
3. Verificar que MongoDB está corriendo (debería iniciar como servicio automáticamente)
4. Para verificar: `mongosh` o `mongo` en terminal

#### Opción B: MongoDB Atlas (Cloud - Recomendado para Pruebas)

1. Ir a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear una cuenta gratuita
3. Crear un cluster (elegir la región más cercana)
4. Crear un usuario y contraseña para la base de datos
5. En la sección "Connect", copiar la cadena de conexión y reemplazar:
   - `<username>` → tu usuario de base de datos
   - `<password>` → tu contraseña de base de datos
   - `<cluster>` → nombre de tu cluster (ej: cluster0)
   - Ejemplo completo: `mongodb+srv://miusuario:micontraseña@cluster0.mongodb.net/todolistweb`
6. Copiar la URL completa en `MONGODB` del `.env`

### Paso 4: Generar Certificados SSL/TLS

#### Opción A: Backend HTTPS + Frontend HTTP (Recomendado)

Generar certificados **SOLO para el backend:**

**En Windows (PowerShell Admin):**

```powershell
# Instalar mkcert (opción 1 - recomendado con winget)
winget install FiloSottile.mkcert

# O si prefieres Chocolatey:
# choco install mkcert -y

# Generar certificados en la carpeta backend/
cd backend
mkcert localhost

# Renombrar los archivos generados
ren localhost.pem cert.pem
ren localhost-key.pem key.pem
```

**En macOS/Linux:**

```bash
# Instalar mkcert
brew install mkcert

# Generar certificados en la carpeta backend/
cd backend
mkcert localhost

# Renombrar los archivos
mv localhost.pem cert.pem
mv localhost-key.pem key.pem
```

#### Opción B: Backend HTTPS + Frontend HTTPS

Si prefieres que AMBOS usen HTTPS, también generar certificados para el frontend:

**En Windows (PowerShell Admin):**

```powershell
# Generar certificados en la carpeta frontend/
cd ../frontend
mkcert localhost

# Renombrar los archivos generados
ren localhost.pem cert.pem
ren localhost-key.pem key.pem
```

**En macOS/Linux:**

```bash
# Generar certificados en la carpeta frontend/
cd ../frontend
mkcert localhost

# Renombrar los archivos
mv localhost.pem cert.pem
mv localhost-key.pem key.pem
```

**El archivo `frontend/.env` ya debería estar creado en el Paso 2B.**

**¡Listo!** Con el `.env` configurado, React automáticamente usará el puerto 3001 cuando ejecutes `npm run dev`.

**Nota:** Si usas Opción B, el frontend será accesible en `https://localhost:3001`

---

**Para este proyecto, recomendamos Opción A**

### Paso 5: Instalar Dependencias

#### Backend:

```bash
cd backend
npm install
```

#### Frontend (en otra terminal):

```bash
cd frontend
npm install
```

### Paso 6: Cargar Datos de Prueba (Seed)

El proyecto incluye un script `seed.js` que carga automáticamente usuarios y tareas de prueba.

```bash
cd backend
npm run seed
```

**Credenciales de prueba que se cargarán:**

```
Email: david.gutierrez@gmail.com
Contraseña: David12345W

Email: oliver.chambi@gmail.com
Contraseña: Oliver12345W
```

### Paso 7: Iniciar la Aplicación

Desde la **raíz del proyecto**, ejecuta:

```bash
npm run dev
```

**Según la opción elegida en Paso 4:**

**Si elegiste Opción A (Backend HTTPS + Frontend HTTP - Recomendado):**
- Backend: https://localhost:3000 (HTTPS con certificado)
- Frontend: http://localhost:3000 (HTTP - se abrirá automáticamente)

```
Conectado a MongoDB
Servidor corriendo en https://localhost:3000
Webpack compilando...
Compilation successful
```

**Si elegiste Opción B (Backend HTTPS + Frontend HTTPS):**
- Backend: https://localhost:3000 (HTTPS con certificado)
- Frontend: https://localhost:3001 (HTTPS con certificado)

**Nota importante:** El navegador podría advertir sobre certificados no confiables en localhost. Esto es **normal y seguro** - son certificados generados localmente con mkcert.

### Paso 8: Prueba la Aplicación

**Si elegiste Opción A:**
1. Abre [http://localhost:3000](http://localhost:3000) en tu navegador
2. Inicia sesión con una de las credenciales de prueba
3. Prueba la app

**Si elegiste Opción B (Frontend HTTPS):**
1. Abre [https://localhost:3001](https://localhost:3001) en tu navegador
2. El navegador advertirá sobre certificado no confiable (esto es normal)
3. Haz clic en "Advanced" > "Proceed to localhost" (o similar según el navegador)
4. Inicia sesión con una de las credenciales de prueba
5. Prueba la app

**Credenciales:**
- Email: `david.gutierrez@gmail.com` | Contraseña: `David12345W`
- Email: `oliver.chambi@gmail.com` | Contraseña: `Oliver12345W`

---

## Información Importante

### Variables de Entorno Sensibles

**Por seguridad no de realizan commit de estos archivos**
- Archivos `.env` (está en `.gitignore`)
- Certificados SSL (`key.pem`, `cert.pem`)
- Tokens o credenciales

El archivo `.env.example` se proporciona como template y SÍ está en Git (sin valores sensibles).

### Credenciales de Prueba

Las credenciales de prueba incluidas en `seed.js` son **SOLO para desarrollo local**. 

---

## Estructura del Proyecto

```
todoListWeb/
├── backend/
│   ├── app.js                 # Punto de entrada del servidor
│   ├── seed.js               # Script para cargar datos de prueba
│   ├── package.json          # Dependencias del backend
│   ├── .env.example          # Template de variables de entorno
│   ├── .env                  # Archivo local (en .gitignore)
│   ├── key.pem               # Certificado privado SSL (en .gitignore)
│   ├── cert.pem              # Certificado público SSL (en .gitignore)
│   ├── controllers/          # Lógica de negocio (auth, tasks, files)
│   ├── models/               # Esquemas de MongoDB
│   ├── routes/               # Rutas de la API
│   ├── middleware/           # Middleware de autenticación
│   └── uploads/              # Archivos subidos por usuarios
├── frontend/
│   ├── package.json          # Dependencias del frontend
│   ├── public/               # Archivos estáticos
│   └── src/
│       ├── App.js            # Componente raíz
│       ├── components/       # Componentes React
│       ├── context/          # Contexto de autenticación
│       └── services/         # Servicios API
├── .env.example              # Template de variables
├── .gitignore                # Archivos ignorados por Git
└── README.md                 # Este archivo
```

---

## Comandos Útiles

### Comando Principal (Recomendado)

```bash
# Desde la raíz del proyecto - inicia backend y frontend simultáneamente
npm run dev
```

### Backend (Individual)

```bash
cd backend

# Iniciar servidor solo
npm start

# Cargar datos de prueba
npm run seed
```

### Frontend (Individual)

```bash
cd frontend

# Iniciar en desarrollo solo
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test
```

---

## Solución de Problemas

### Error: "Cannot find module 'dotenv'"
```bash
cd backend
npm install
```

### Error: "MONGODB connection failed"
- Verifica que MongoDB está corriendo
- Verifica la URL en `.env` es correcta
- Si usas Atlas, verifica que tu IP está en la whitelist

### Error: "EADDRINUSE: address already in use :::3000"
- El puerto 3000 ya está en uso
- Cambia el valor de `PORT` en `.env`
- O cierra la aplicación que está usando ese puerto

### Error: "Certificate error" / "self signed certificate"
- Es normal en localhost
- En navegadores modernos, hace clic en "Advanced" > "Proceed to localhost"
- La aplicación funcionará correctamente

### El seed.js no carga datos
- Verifica que MongoDB está corriendo
- Verifica la conexión en `.env`
- Asegúrate de estar en la carpeta `backend/`

---

## Tecnologías Utilizadas

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT para autenticación
- bcryptjs para encriptación de contraseñas
- Multer para carga de archivos

**Frontend:**
- React 18
- React Context API para manejo de estado
- Fetch API para llamadas HTTP

---

## Licencia

ISC

---

## Autores

- David Gutierrez
- Oliver Chambi
