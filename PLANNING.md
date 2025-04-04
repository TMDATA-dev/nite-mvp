# PLANNING.md

## Objetivo general

Desarrollar un MVP de un asistente de hoteles que mejore significativamente la experiencia del cliente. Este asistente estará disponible para resolver dudas frecuentes y realizar tareas prácticas como pedir un taxi, facilitando una experiencia fluida y memorable.

## Visión

Crear una herramienta basada en inteligencia artificial que pueda integrarse fácilmente en hoteles para ofrecer soporte 24/7, gestionar peticiones del cliente y ejecutar acciones reales (como llamadas telefónicas automáticas) mediante integraciones.

## Alcance del MVP

- Integración con un agente de n8n que realiza llamadas automáticas usando la API de Vapi.
- Devolución de una URL de escucha para que el usuario pueda oír la llamada desde la plataforma.
- Interfaz simple y visual para realizar solicitudes básicas (como pedir un taxi).
- Autenticación de usuarios mediante Supabase.
- Chat integrado (por ahora con n8n).

## Público objetivo

Hoteles pequeños y medianos que deseen digitalizar su servicio al cliente sin invertir en desarrollos complejos.

## Tecnologías utilizadas

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Supabase (Auth + Functions)
- **Automatización / Llamadas**: n8n + Vapi
- **IDE**: Cursor

## Posible evolución futura

- Integración con tecnología MCP para reconocimiento de voz en dispositivos físicos.
- Registro de historial de solicitudes por usuario.
- Chat embebido con RAG.
