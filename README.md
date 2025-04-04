# Nite-MVP

Aplicación para crear y gestionar "nites" (eventos nocturnos) desarrollada con Next.js y Supabase.

## Características

- Autenticación de usuarios (registro/inicio de sesión)
- Creación y gestión de eventos nocturnos
- Búsqueda de eventos por ubicación, fecha y categoría
- Reservas y compra de entradas
- Perfil de usuario con historial de eventos
- Diseño responsive con Tailwind CSS

## Requisitos previos

- Node.js 18.0.0 o superior
- npm o yarn

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/EndikaTMDATA/nite-mvp.git
cd nite-mvp
```

2. Instala las dependencias:

```bash
npm install
# o
yarn
```

3. Configura las variables de entorno:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase y otras APIs necesarias.

## Desarrollo

Para ejecutar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Estructura del proyecto

Consulta [docs/estructura.md](docs/estructura.md) para ver la estructura detallada del proyecto.

## Estructura de ramas

Seguimos un modelo de ramificación basado en GitFlow:

- **main**: Rama principal que contiene código de producción estable y listo para desplegar
- **develop**: Rama de desarrollo donde se integran las características completadas
- **feature/nombre**: Ramas para el desarrollo de nuevas características (parten de develop)
- **hotfix/nombre**: Ramas para correcciones rápidas en producción (parten de main)
- **release/v.x.x.x**: Ramas para preparar versiones para lanzamiento

### Flujo de trabajo

1. Para desarrollar una nueva característica:

   ```bash
   git checkout develop
   git pull
   git checkout -b feature/nombre-caracteristica
   # Realizar cambios
   git add .
   git commit -m "Descripción de los cambios"
   git push origin feature/nombre-caracteristica
   # Crear Pull Request hacia develop
   ```

2. Para corregir un error en producción:
   ```bash
   git checkout main
   git pull
   git checkout -b hotfix/nombre-error
   # Realizar correcciones
   git add .
   git commit -m "Corrección del error"
   git push origin hotfix/nombre-error
   # Crear Pull Request hacia main y develop
   ```

## Implementación

Para construir la aplicación para producción:

```bash
npm run build
# o
yarn build
```

## Tecnologías utilizadas

- [Next.js](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Supabase](https://supabase.io/) - Backend as a Service
- [Zustand](https://github.com/pmndrs/zustand) - Gestión de estado

## Contribución

Consulta [docs/estructura.md](docs/estructura.md) para conocer nuestras convenciones de código y flujo de trabajo con Git.
