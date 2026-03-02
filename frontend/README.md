# 🎨 Frontend - Sistema Bancario

Frontend desarrollado con **React 18** y **Tailwind CSS** para el sistema de gestión bancaria.

---

## 📋 Tabla de Contenidos

1. [Tecnologías](#tecnologías)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Uso](#uso)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Componentes](#componentes)
7. [Documentación](#documentación)
8. [API Integration](#api-integration)

---

## 🛠️ Tecnologías

- **React 18.3** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite 6** - Build tool rápido y moderno
- **Tailwind CSS 4.2** - Framework CSS (CSS-first engine)
- **React Router 7** - Enrutamiento para SPA (Single Page Application)

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (viene con Node.js)
- **Backend** del proyecto corriendo en `http://localhost:3000`

> **Nota:** El backend es necesario para que la aplicación funcione correctamente.

---

## 🚀 Instalación

### Paso 1: Navega al directorio del frontend

```bash
cd frontend
```

### Paso 2: Instala las dependencias

```bash
npm install
```

Esto instalará todas las dependencias definidas en `package.json`:

- react, react-dom
- react-router-dom
- tailwindcss, @tailwindcss/vite
- vite, @vitejs/plugin-react

### Paso 3: Verifica la instalación

Una vez completada la instalación, deberías ver una carpeta `node_modules` con todas las dependencias.

---

## 🎯 Uso

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite en:

- **URL:** http://localhost:5173
- **Red local:** También mostrará la URL de red local para acceder desde otros dispositivos

### Construir para producción

```bash
npm run build
```

Esto generará una versión optimizada de la aplicación en la carpeta `dist/`.

### Vista previa de la build de producción

```bash
npm run preview
```

Esto sirve la build de producción localmente para verificar que todo funciona correctamente.

---

## 📁 Estructura del Proyecto

```
frontend/
│
├── public/                  # Archivos públicos estáticos
│
├── src/                     # Código fuente
│   ├── pages/               # Páginas principales
│   │   ├── Login.jsx              # Página de login
│   │   ├── Dashboard.jsx          # Dashboard principal con menú
│   │   └── panels/                # Componentes de cada panel
│   │       ├── MovimientosPanel.jsx
│   │       ├── AbonoPanel.jsx
│   │       ├── RetiradaPanel.jsx
│   │       └── BizumPanel.jsx
│   │
│   ├── components/          # Componentes reutilizables
│   │   └── ProtectedRoute.jsx    # Guard para rutas protegidas
│   │
│   ├── utils/               # Funciones utilitarias
│   │   └── auth.js               # localStorage sin Context
│   │
│   ├── App.jsx              # Router principal
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales y Config Tailwind v4
│
├── index.html               # Plantilla HTML
├── package.json             # Dependencias
├── vite.config.js           # Config Vite (proxy + tailwind plugin)
└── README.md                # Este archivo
```

---

## 🧩 Componentes

### 1. **App.jsx** - Router Principal

Configura el enrutamiento de la aplicación con React Router.

**Características:**

- BrowserRouter para gestionar rutas
- Rutas protegidas usando ProtectedRoute
- Redirección automática a /dashboard para usuarios autenticados
- Redirect a /login para usuarios no autenticados
- Fallback a /dashboard para rutas inexistentes

**Rutas disponibles:**

- `GET /` → Redirige a `/dashboard`
- `GET /login` → Página de login (pública)
- `GET /dashboard` → Dashboard personal (protegida)
- `GET *` → Redirige a `/dashboard`

---

### 2. **Login.jsx** - Página de Autenticación

Componente de login con interfaz moderna y segura.

**Funcionalidades:**

- Formulario de login (usuario y contraseña)
- Validación de campos
- Mensajes de error claros
- Spinner de carga durante la autenticación
- Muestra credenciales de prueba
- Gradiente de fondo atractivo
- Diseño responsivo
- Guarda usuario en **localStorage** al hacer login
- Redirige a /dashboard tras login exitoso

**Estados:**

- Loading: Mientras se procesa la autenticación
- Error: Muestra mensaje si las credenciales son inválidas
- Success: Redirige al dashboard

**Código clave:**

```javascript
import { saveUser } from '../utils/auth';

// Después de login exitoso:
saveUser(data.data.usuario); // Guarda en localStorage
navigate('/dashboard'); // Redirige
```

**Endpoint consumido:**

```
POST /api/auth/login
Body: { username, password }
Response: { success, message, data: { usuario } }
```

---

### 3. **Dashboard.jsx** - Dashboard Personal

Interfaz principal del usuario autenticado con 4 pestañas funcionales.

**Características generales:**

- Lee usuario de **localStorage** automáticamente
- Header con nombre del usuario y botón de logout
- Tarjeta grande mostrando el saldo actual en tiempo real
- 4 pestañas con funcionalidades diferentes
- Actualización automática del saldo después de cada operación
- Manejo de errores y estados de carga
- Diseño responsivo

**Código clave:**

```javascript
import { getUser, clearUser } from '../utils/auth';

// Al abrir el dashboard:
const user = getUser(); // Lee del localStorage

// Al hacer logout:
const handleLogout = () => {
  clearUser(); // Limpia localStorage
  navigate('/login'); // Redirige
};
```

**Pestaña 1: 📊 Mis Movimientos**

- Muestra historial personal de movimientos
- Cada movimiento incluye:
  - Tipo: Abono / Retirada / Bizum
  - Importe con signo (+ entrada, - salida)
  - Concepto/Descripción
  - Fecha y hora
  - Saldo después de la operación
- Colores diferenciados:
  - Verde para ingresos (+)
  - Rojo para salidas (-)
  - Azul para transferencias
- Auto-carga al montarse el componente
- Botón de actualización manual

**Pestaña 2: 💰 Ingresar Dinero**
Formulario para hacer abonos a la cuenta.

**Campos:**

- **Importe** (requerido): Cantidad a ingresar, mínimo 0.01€
- **Concepto** (opcional): Descripción del abono

**Funcionalidades:**

- Validación de importe positivo y mayor a cero
- Mensajes de éxito/error
- Limpieza automática del formulario después de éxito
- Spinner durante el envío
- Botón deshabilitado mientras se procesa
- Estilos verdes para coherencia visual

**Endpoint consumido:**

```javascript
POST / api / movimientos / abono;
Body: {
  (id_usuario, importe, concepto);
}
```

**Pestaña 3: 💸 Retirar Dinero**
Formulario para hacer retiradas de la cuenta.

**Campos:**

- **Importe** (requerido): Cantidad a retirar, mínimo 0.01€
- **Concepto** (opcional): Descripción de la retirada

**Funcionalidades:**

- Validación de saldo suficiente (validación en backend)
- Mensajes de error específicos:
  - "Saldo insuficiente" si no hay fondos
  - "Importe inválido" si es cero o negativo
- Estilos rojos para advertencia visual
- Spinner durante procesamiento
- Botón deshabilitado mientras se procesa

**Endpoint consumido:**

```javascript
POST / api / movimientos / retirada;
Body: {
  (id_usuario, importe, concepto);
}
```

**Pestaña 4: 📱 Enviar Bizum**
Formulario para transferencias entre usuarios por teléfono.

**Campos:**

- **Teléfono Destino** (requerido): Formato +34XXXXXXXXX
- **Importe** (requerido): Cantidad a transferir, mínimo 0.01€
- **Concepto** (opcional): Motivo de la transferencia

**Funcionalidades:**

- Validación de teléfono registrado en el sistema
- Validación de saldo suficiente
- Prevención de auto-transferencias (no puedes enviarte a ti mismo)
- Mensajes de error específicos:
  - "Usuario destinatario no encontrado"
  - "Saldo insuficiente"
  - "No puedes enviarte dinero a ti mismo"
- Spinner durante procesamiento
- Botón deshabilitado mientras se procesa
- Estilos azules para destacar

**Endpoint consumido:**

```javascript
POST / api / movimientos / transferencia;
Body: {
  (id_usuario_origen, telefono_destino, importe, concepto);
}
```

---

### 4. **ProtectedRoute.jsx** - Componente Guard

HOC (Higher Order Component) que protege rutas requiriendo autenticación.

**Funcionalidad:**

- Verifica si el usuario está autenticado (en localStorage)
- Si está autenticado: Renderiza el componente mostrado
- Si no está autenticado: Redirige a /login

**Código clave:**

```javascript
import { isAuthenticated } from '../utils/auth';

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
```

**Uso:**

```jsx
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

---

### 5. **utils/auth.js** - Funciones de Autenticación

Archivo simple con 4 funciones para manejar localStorage.

**Funciones:**

```javascript
// Guardar usuario después de login
saveUser(user);
// Ejemplo: saveUser({ id_usuario: 1, username: 'juan', ... })

// Obtener usuario actual
getUser();
// Retorna: { id_usuario, username, nombre, ... } o null

// Eliminar usuario (logout)
clearUser();
// Limpia todo el localStorage relacionado con auth

// Verificar si está autenticado
isAuthenticated();
// Retorna: true o false
```

**Ventaja:** Mucho más simple que Context API, perfecto para estudiantes principiantes.

**Almacenamiento:**
Los datos se guardan en `localStorage.user` como JSON:

```json
{
  "id_usuario": 1,
  "username": "juan",
  "nombre": "Juan",
  "apellido": "Pérez",
  "telefono": "+34600111222",
  "saldo_actual": 450.0
}
```

---

### 6. **BizumForm.jsx** - Formulario de Bizum

Permite realizar transferencias usando el número de teléfono (sistema Bizum).

**Campos:**

- **ID Usuario Origen** (requerido): Tu ID de usuario
- **Teléfono Destino** (requerido): Número del receptor (formato: +34600333444)
- **Importe** (requerido): Cantidad a transferir (mínimo 0.01€)
- **Concepto** (opcional): Descripción del Bizum

**Funcionalidades:**

- Validación de formato de teléfono (regex)
- Verificación de que el teléfono está registrado (backend)
- Prevención de auto-transferencias (backend)
- Verificación de saldo suficiente (backend)
- Mensajes de éxito/error
- Información educativa sobre cómo funciona Bizum
- Limpieza automática del formulario tras éxito
- Botón deshabilitado durante el envío
- Spinner de carga
- Estilos azules (coherente con "digital/móvil")

**Endpoint consumido:**

```
POST /api/movimientos/transferencia
Body: { id_usuario_origen, telefono_destino, importe, concepto }
```

---

## � API Integration

### Configuración del Proxy

El frontend está configurado para comunicarse con el backend a través de un **proxy de Vite**.

Configuración en `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

**¿Qué hace esto?**

- Todas las peticiones a `/api/*` se redirigen automáticamente a `http://localhost:3000/api/*`
- Evita problemas de CORS en desarrollo
- Permite usar rutas relativas en el código (`/api/movimientos/usuario/1` en vez de `http://localhost:3000/api/movimientos/usuario/1`)

### Endpoints Utilizados

#### **Autenticación**

```javascript
// Login de usuario
POST /api/auth/login
Body: {
  username: "juan",
  password: "password123"
}
Response: {
  success: true,
  message: "Login exitoso",
  data: {
    usuario: {
      id_usuario: 1,
      username: "juan",
      nombre: "Juan",
      apellido: "Pérez",
      telefono: "+34600111222",
      saldo_actual: 450.00
    }
  }
}

// Obtener info del usuario
GET /api/auth/user/:id_usuario
Response: {
  success: true,
  data: {
    usuario: {...}
  }
}
```

#### **Movimientos del Usuario**

```javascript
// Obtener movimientos personales
GET /api/movimientos/usuario/:id_usuario
Response: {
  success: true,
  data: [
    {
      id_movimiento: 1,
      tipo: "abono",
      direccion: "entrada",
      importe: 100.00,
      concepto: "Ingreso inicial",
      fecha_hora: "2026-02-17T10:30:00.000Z",
      saldo_final: 550.00,
      usuario_nombre: "Juan",
      usuario_apellido: "Pérez",
      relacionado_nombre: null,
      relacionado_apellido: null
    },
    ...
  ]
}

// Crear abono
POST /api/movimientos/abono
Body: {
  id_usuario: 1,
  importe: 100.50,
  concepto: "Ingreso extra"
}
Response: {
  success: true,
  message: "Abono realizado con éxito",
  data: {
    saldo_nuevo: 550.50
  }
}

// Crear retirada
POST /api/movimientos/retirada
Body: {
  id_usuario: 1,
  importe: 50.00,
  concepto: "Retirada ATM"
}
Response: {
  success: true,
  message: "Retirada realizada con éxito",
  data: {
    saldo_nuevo: 500.50
  }
}

// Crear transferencia (Bizum)
POST /api/movimientos/transferencia
Body: {
  id_usuario_origen: 1,
  telefono_destino: "+34600333444",
  importe: 25.00,
  concepto: "Cena Friday"
}
Response: {
  success: true,
  message: "Transferencia realizada con éxito"
}
```

### Manejo de Errores

Todos los componentes manejan errores del backend:

```javascript
// Respuesta típica de error
{
  success: false,
  message: "Saldo insuficiente para realizar la retirada"
}
```

Los errores se muestran en mensajes visuales con fondo rojo para el usuario.

---

## 🎨 Personalización de Estilos

### Colores Utilizados en el Proyecto

El proyecto usa Tailwind CSS con estos colores principales:

- **Azul (blue):** Componentes primarios e información
- **Verde (green):** Ingresos, acciones positivas
- **Rojo (red):** Salidas, advertencias, errores
- **Gris (gray):** Fondos, bordes, texto secundario
- **Gradientes:** Fondos modernos combinando colores

### Responsividad

El proyecto es completamente responsivo usando breakpoints de Tailwind:

- **Móvil:** < 640px - Una columna, interfaces simplificadas
- **Tablet:** 640px - 1024px - Dos columnas
- **Desktop:** > 1024px - Interfaz completa

---

## 📱 Flujo de Usuario Completo

### 1. **Iniciar Sesión**

```
http://localhost:5173 → Página Login
Ingresa: juan / password123
→ saveUser(data) guarda el usuario en localStorage
→ Redirige a /dashboard
```

### 2. **Dashboard Personal**

```
/dashboard → Muestra tu data personal
- Saldo: 450.00€
- Pestaña 1: Mis Movimientos (fetch GET /api/movimientos/usuario/1)
- Pestaña 2: Ingresar Dinero (form POST /api/movimientos/abono)
- Pestaña 3: Retirar Dinero (form POST /api/movimientos/retirada)
- Pestaña 4: Enviar Bizum (form POST /api/movimientos/transferencia)
```

### 3. **Persistencia de Sesión**

```
Recarga página → getUser() lee el usuario de localStorage
→ El Dashboard se carga usando los datos cacheados
→ Sigue autenticado sin necesidad de login nuevamente
```

### 4. **Logout**

```
Clic en "🚪 Cerrar Sesión"
→ clearUser() limpia datos
→ localStorage se vacía
→ Redirige a /login
```

---

## 🐛 Troubleshooting

### Error: "Cannot GET /api/movimientos/usuario/1"

**Causa:** El backend no está corriendo

**Solución:**

```bash
# Terminal separada
cd backend
npm start

# Verifica que esté en http://localhost:3000
curl http://localhost:3000/api/usuarios
```

### Error: "Login failed" o credenciales inválidas

**Causa:** Usuario no existe en la BD

**Solución:**
Usa los usuarios de prueba:

- `juan` / `password123`
- `ana` / `password123`
- `carlos` / `password123`

### No veo mis movimientos después de una operación

**Causa:** El componente no se actualizó

**Solución:**

1. Abre la consola del navegador (F12)
2. Verifica que no haya errores en Network
3. Haz click en el botón de "Actualizar" de la pestaña
4. Si persiste, comprueba que el backend responde: `curl http://localhost:3000/api/movimientos/usuario/1`

### Puerto 5173 ya está en uso

**Solución:**

```bash
# Mata el proceso en el puerto
lsof -ti:5173 | xargs kill -9

# O inicia en otro puerto
npm run dev -- --port 5174
```

---

## 📚 Recursos Educativos

### Para Aprender React

- [React Official Docs](https://react.dev)
- [React Router Documentation](https://reactrouter.com)

### Para Aprender Tailwind CSS

- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [Tailwind UI Components](https://tailwindui.com)

### Conceptos Clave en Este Proyecto

- **Componentes funcionales** con Hooks (useState, useEffect)
- **React Router 7** para SPA (Single Page Application)
- **Fetch API** para comunicación HTTP async/await
- **localStorage** para persistencia de datos y de la sesión
- **Tailwind CSS v4** para diseño web usando `@theme` y `@utility` en `index.css`

---

## ✅ Checklist de Características

- [x] Sistema de login con usuario/contraseña
- [x] Protección de rutas (ProtectedRoute)
- [x] Persistencia de sesión en localStorage
- [x] Dashboard personalizado por usuario
- [x] Visualización de saldo en tiempo real
- [x] Historial de movimientos personales
- [x] Formulario para ingresar dinero
- [x] Formulario para retirar dinero
- [x] Formulario para enviar Bizum
- [x] Actualización automática de saldo
- [x] Manejo de errores
- [x] Diseño responsivo
- [x] Logout seguro

---

¡Gracias por usar la aplicación bancaria! 🚀

**Desarrollado con ❤️ para fines educativos**

---

## 📚 Recursos Adicionales

- **React Documentation:** https://react.dev
- **Vite Documentation:** https://vitejs.dev
- **Tailwind CSS v4 Documentation:** https://tailwindcss.com/docs
- **Guía de Desarrollo Frontend (Paso a paso):** `./GUIA_DESARROLLO_FRONTEND.md`
- **Guía de Estilos Tailwind:** `./GUIA_TAILWIND.md`
- **Guía Educativa de Backend:** `../backend/GUIA_EDUCATIVA_BACKEND.md`
- **Documentación de Bizum:** `../backend/BIZUM_DOCUMENTACION.md`

---

## 🤝 Contribuir

Si encuentras errores o quieres mejorar el proyecto:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/mi-mejora`)
3. Commit tus cambios (`git commit -m 'Añadir mi mejora'`)
4. Push a la rama (`git push origin feature/mi-mejora`)
5. Abre un Pull Request

---

## 📝 Notas Finales

- **Desarrollo:** El proyecto usa Vite en modo desarrollo con Hot Module Replacement (HMR) - los cambios se reflejan instantáneamente sin recargar la página.
- **Producción:** Antes de desplegar, siempre ejecuta `npm run build` y `npm run preview` para verificar.
- **Aprendizaje:** Lee la `GUIA_TAILWIND.md` para entender cómo funcionan los estilos.
- **Backend:** Asegúrate de que el backend esté corriendo antes de usar la aplicación.

---

¡Disfruta desarrollando con React y Tailwind CSS! 🚀
