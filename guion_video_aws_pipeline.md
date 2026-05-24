# Guion para video del taller AWS CodePipeline

Duracion sugerida: 7 a 9 minutos.

## 1. Presentacion del objetivo

En este video se explica el despliegue automatico de una API RESTful de estudiantes usando AWS CodePipeline, AWS CodeBuild y AWS Elastic Beanstalk.

## 2. Aplicacion usada

Mostrar el proyecto `student-api`.

Puntos a explicar:

- La API esta desarrollada en Node.js.
- Endpoints principales: `GET /health`, `POST /students`, `GET /students`, `GET /students/{id}`.
- El servidor usa `process.env.PORT`, necesario para el despliegue en AWS.

## 3. Archivos de despliegue

Mostrar `Procfile`.

Explicar que contiene:

```text
web: npm start
```

Mostrar `buildspec.yml`.

Explicar que CodeBuild:

- Entra a la carpeta `student-api`.
- Instala dependencias con `npm ci`.
- Ejecuta pruebas con `npm test`.
- Genera el artefacto que Elastic Beanstalk va a desplegar.

## 4. Arquitectura del pipeline

Explicar las tres etapas:

1. Fuente: CodePipeline obtiene el codigo desde GitHub o CodeCommit.
2. Construccion: CodeBuild ejecuta pruebas y prepara el artefacto.
3. Despliegue: Elastic Beanstalk recibe la nueva version de la API.

## 5. Configuracion en AWS

Mostrar capturas o la consola:

- Aplicacion y ambiente en Elastic Beanstalk.
- Proyecto de CodeBuild.
- Pipeline con sus tres etapas.

## 6. Prueba del despliegue automatico

Realizar o explicar un cambio pequeno:

- Modificar version en `package.json` o respuesta de `/health`.
- Hacer commit y push.
- Mostrar que CodePipeline detecta el cambio.
- Mostrar etapa de construccion exitosa.
- Mostrar etapa de despliegue exitosa.

## 7. Validacion de la API

Probar la URL publica:

```powershell
curl http://URL-DEL-AMBIENTE.elasticbeanstalk.com/health
curl http://URL-DEL-AMBIENTE.elasticbeanstalk.com/students
```

Cerrar explicando que el proceso queda automatizado: cada cambio en el repositorio puede compilarse, probarse y desplegarse sin intervencion manual.
