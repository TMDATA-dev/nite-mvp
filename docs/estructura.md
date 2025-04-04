# Estructura del Proyecto Nite-MVP

Este documento describe la estructura de carpetas y archivos del proyecto.

## Estructura de Carpetas

- **src/**: Contiene todo el código fuente de la aplicación

  - **app/**: Rutas de Next.js (App Router)
  - **components/**: Componentes reutilizables
  - **lib/**: Bibliotecas y utilidades
  - **types/**: Definiciones de tipos TypeScript

- **docs/**: Documentación del proyecto
  - **estructura.md**: Este archivo
- **public/**: Archivos estáticos accesibles públicamente

- **supabase/**: Configuración y funciones relacionadas con Supabase

## Estructura de Ramas Git

- **main**: Rama principal. Contiene código de producción estable.
- **dev**: Rama de desarrollo. Integraciones de nuevas características antes de producción.
- **feature/{nombre}**: Ramas para desarrollo de características específicas.

## Convenciones

### Commits

Seguimos el formato de Conventional Commits:

- `feat:` para nuevas características
- `fix:` para correcciones de errores
- `docs:` para cambios en documentación
- `style:` para cambios que no afectan el significado del código
- `refactor:` para cambios de código que no corrigen errores ni añaden características
- `test:` para añadir o modificar pruebas

### Desarrollo

- Crear una rama feature/ desde dev para cada nueva característica
- Hacer pull requests a dev cuando la característica esté lista
- Integrar dev a main solo cuando sea estable para producción
