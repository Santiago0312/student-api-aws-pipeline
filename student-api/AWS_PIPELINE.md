# Despliegue automatico en AWS con CodePipeline

Este documento describe la configuracion recomendada para desplegar la API RESTful de estudiantes usando AWS CodePipeline, AWS CodeBuild y AWS Elastic Beanstalk.

## Arquitectura

Flujo de CI/CD:

```text
GitHub o CodeCommit -> AWS CodePipeline -> AWS CodeBuild -> AWS Elastic Beanstalk
```

Etapas:

1. **Fuente**: CodePipeline obtiene el codigo desde el repositorio.
2. **Construccion**: CodeBuild instala dependencias, ejecuta pruebas y genera el artefacto.
3. **Despliegue**: Elastic Beanstalk publica la nueva version de la API.

## Requisitos previos

- Cuenta de AWS con permisos para CodePipeline, CodeBuild, Elastic Beanstalk, S3 e IAM.
- Repositorio en GitHub o AWS CodeCommit.
- Aplicacion Elastic Beanstalk con plataforma Node.js.
- Rama principal del proyecto actualizada.

## Archivos importantes

- `package.json`: define scripts de ejecucion y pruebas.
- `src/server.js`: punto de entrada de la API.
- `Procfile`: indica a Elastic Beanstalk como iniciar la aplicacion.
- `buildspec.yml`: define los comandos ejecutados por CodeBuild.

## Configuracion de Elastic Beanstalk

1. Crear una nueva aplicacion llamada `student-api`.
2. Crear un ambiente web con plataforma Node.js.
3. Seleccionar una configuracion de instancia sencilla para la practica.
4. Confirmar que el ambiente quede en estado saludable.

Elastic Beanstalk ejecutara:

```text
npm start
```

El servidor escucha el puerto recibido en la variable de entorno `PORT`, requisito habitual para plataformas administradas.

## Configuracion de CodeBuild

Crear un proyecto de CodeBuild con:

- Fuente: el mismo repositorio usado por CodePipeline.
- Imagen: imagen administrada de AWS para Node.js.
- Buildspec: `student-api/buildspec.yml`.

El archivo `buildspec.yml` realiza:

```text
cd student-api
npm ci
npm test
```

Si las pruebas pasan, CodeBuild entrega a CodePipeline los archivos necesarios para desplegar en Elastic Beanstalk.

## Configuracion de CodePipeline

Crear un pipeline con tres etapas:

1. **Source**
   - Proveedor: GitHub o CodeCommit.
   - Rama: `main` o la rama principal usada por el grupo.

2. **Build**
   - Proveedor: AWS CodeBuild.
   - Proyecto: proyecto creado para `student-api`.

3. **Deploy**
   - Proveedor: AWS Elastic Beanstalk.
   - Aplicacion: `student-api`.
   - Ambiente: ambiente web Node.js creado previamente.

## Prueba del despliegue

Hacer un cambio pequeno en el repositorio, por ejemplo actualizar la version en `package.json`, y subirlo a la rama principal:

```powershell
git add .
git commit -m "Actualizar API de estudiantes"
git push
```

Luego verificar que CodePipeline ejecute las etapas de fuente, construccion y despliegue.

## Validacion

Cuando Elastic Beanstalk termine el despliegue, validar la API:

```powershell
curl http://URL-DEL-AMBIENTE.elasticbeanstalk.com/health
curl http://URL-DEL-AMBIENTE.elasticbeanstalk.com/students
```

Respuesta esperada para salud:

```json
{
  "status": "ok"
}
```

## Evidencias para el informe

Capturas recomendadas:

- Repositorio conectado como fuente del pipeline.
- Proyecto de CodeBuild con ejecucion exitosa.
- Pipeline completo en estado exitoso.
- Ambiente de Elastic Beanstalk en estado saludable.
- Prueba de la URL publica de la API.
