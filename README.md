# Nite-MVP

Asistente de hoteles basado en IA que mejora significativamente la experiencia del cliente, resolviendo dudas frecuentes y realizando tareas prácticas como pedir un taxi.

## Objetivo

Crear una herramienta basada en inteligencia artificial que pueda integrarse fácilmente en hoteles para ofrecer soporte 24/7, gestionar peticiones del cliente y ejecutar acciones reales mediante integraciones.

## Características

- Integración con un agente de n8n que realiza llamadas automáticas usando la API de Vapi
- Devolución de una URL de escucha para que el usuario pueda oír la llamada desde la plataforma
- Interfaz simple y visual para realizar solicitudes básicas (como pedir un taxi)
- Autenticación de usuarios mediante Supabase
- Chat integrado (por ahora con n8n)

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

- **Frontend**: [Next.js](https://nextjs.org/), React, [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.io/) (Auth + Functions)
- **Automatización / Llamadas**: n8n + Vapi
- **IDE**: Cursor
- **TypeScript**: Para tipado estático

## Posible evolución futura

- Integración con tecnología MCP para reconocimiento de voz en dispositivos físicos
- Registro de historial de solicitudes por usuario
- Chat embebido con RAG

## Contribución

Consulta [docs/estructura.md](docs/estructura.md) para conocer nuestras convenciones de código y flujo de trabajo con Git.
