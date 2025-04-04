# Flujo de Trabajo Git para Nite-MVP

Este documento describe en detalle el flujo de trabajo de Git que utilizamos en el proyecto Nite-MVP, basado en GitFlow.

## Estructura de Ramas

Utilizamos las siguientes ramas principales:

### Ramas Permanentes

- **main**: Contiene el código de producción estable. Solo se fusionan cambios desde `hotfix/` o `release/`.
- **develop**: Rama de integración donde se incorporan todas las características completadas antes de pasar a producción.

### Ramas Temporales

- **feature/nombre**: Para desarrollar nuevas funcionalidades. Se crean a partir de `develop` y se fusionan de vuelta a `develop`.
- **hotfix/nombre**: Para correcciones urgentes en producción. Se crean a partir de `main` y se fusionan tanto a `main` como a `develop`.
- **release/x.y.z**: Para preparar lanzamientos. Se crean desde `develop` cuando está lista para un lanzamiento y se fusionan a `main` y `develop`.

## Proceso Detallado

### Desarrollo de Nuevas Características

1. Actualiza tu rama `develop` local:

   ```bash
   git checkout develop
   git pull origin develop
   ```

2. Crea una nueva rama de características:

   ```bash
   git checkout -b feature/nombre-descriptivo
   ```

3. Desarrolla la característica, realizando commits frecuentes:

   ```bash
   git add .
   git commit -m "feat: descripción específica del cambio"
   ```

4. Actualiza tu rama con los cambios recientes de `develop` regularmente:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/nombre-descriptivo
   git merge develop
   ```

5. Cuando la característica esté completa, sube la rama:

   ```bash
   git push origin feature/nombre-descriptivo
   ```

6. Crea un Pull Request hacia `develop` en GitHub.

### Corrección de Errores en Producción

1. Actualiza tu rama `main` local:

   ```bash
   git checkout main
   git pull origin main
   ```

2. Crea una rama de hotfix:

   ```bash
   git checkout -b hotfix/descripcion-error
   ```

3. Implementa la corrección:

   ```bash
   git add .
   git commit -m "fix: descripción de la corrección"
   ```

4. Sube la rama:

   ```bash
   git push origin hotfix/descripcion-error
   ```

5. Crea Pull Requests hacia `main` y `develop`.

### Preparación de Versiones para Lanzamiento

1. Cuando `develop` tiene todas las características planificadas para una versión:

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/x.y.z
   ```

2. Realiza ajustes finales y correcciones menores:

   ```bash
   git add .
   git commit -m "chore: preparación para lanzamiento x.y.z"
   ```

3. Actualiza el número de versión en los archivos correspondientes.

4. Sube la rama:

   ```bash
   git push origin release/x.y.z
   ```

5. Crea Pull Requests hacia `main` y `develop`.

## Convenciones de Commits

Utilizamos el formato de Conventional Commits para mantener un histórico claro:

- `feat:` - Nueva característica
- `fix:` - Corrección de errores
- `docs:` - Cambios en documentación
- `style:` - Cambios en formato (espacios, indentación, etc.)
- `refactor:` - Cambio de código que no corrige errores ni añade características
- `test:` - Añadir o modificar pruebas
- `chore:` - Cambios en el proceso de build o herramientas auxiliares

## Etiquetas y Versiones

Usamos etiquetas semánticas (Semantic Versioning) para marcar versiones:

- **x.y.z** donde:
  - **x**: Versión mayor (cambios incompatibles con versiones anteriores)
  - **y**: Versión menor (nuevas características compatibles)
  - **z**: Parche (correcciones de errores compatibles)

Para crear una nueva etiqueta después de fusionar a `main`:

```bash
git checkout main
git pull origin main
git tag -a vx.y.z -m "Versión x.y.z"
git push origin vx.y.z
```
