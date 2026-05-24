# Student API AWS Pipeline

Proyecto academico para demostrar un despliegue automatico de una API RESTful de estudiantes usando AWS CodePipeline, AWS CodeBuild y AWS Elastic Beanstalk.

## Arquitectura de CI/CD

```text
GitHub -> AWS CodePipeline -> AWS CodeBuild -> AWS Elastic Beanstalk
```

Etapas del pipeline:

1. **Fuente**: CodePipeline obtiene el codigo desde este repositorio.
2. **Construccion**: CodeBuild instala dependencias, ejecuta pruebas y genera el artefacto.
3. **Despliegue**: Elastic Beanstalk publica la nueva version de la API Node.js.

## Estructura del repositorio

```text
student-api/
  src/                 Codigo fuente de la API
  test/                Pruebas automatizadas
  AWS_PIPELINE.md      Guia de configuracion del pipeline en AWS
  buildspec.yml        Configuracion de AWS CodeBuild
  Procfile             Comando de arranque para Elastic Beanstalk
  Dockerfile           Imagen Docker opcional
ENTREGA_AWS_PIPELINE.md
Guion del video: guion_video_aws_pipeline.md
```

## Ejecucion local

```powershell
cd student-api
npm test
npm start
```

La API queda disponible en:

```text
http://localhost:3000
```

Endpoints principales:

- `GET /health`
- `POST /students`
- `GET /students`
- `GET /students/{id}`

## Despliegue en AWS

La guia completa se encuentra en [`student-api/AWS_PIPELINE.md`](student-api/AWS_PIPELINE.md).

Resumen:

1. Crear una aplicacion y ambiente Node.js en AWS Elastic Beanstalk.
2. Crear un proyecto de AWS CodeBuild usando `student-api/buildspec.yml`.
3. Crear un pipeline en AWS CodePipeline con etapas de fuente, construccion y despliegue.
4. Hacer un cambio en el repositorio y verificar la ejecucion automatica del pipeline.

## Validacion del servicio desplegado

```powershell
curl http://URL-DEL-AMBIENTE.elasticbeanstalk.com/health
curl http://URL-DEL-AMBIENTE.elasticbeanstalk.com/students
```

## Entregables academicos

- Informe base: `ENTREGA_AWS_PIPELINE.md`
- Guia tecnica AWS: `student-api/AWS_PIPELINE.md`
- Guion de video: `guion_video_aws_pipeline.md`
