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

- **main**: Rama principal para código de producción
- **dev**: Rama de desarrollo para integración de características
- **feature/nombre**: Ramas para desarrollo de características específicas

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
