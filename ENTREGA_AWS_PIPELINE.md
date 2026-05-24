# Entrega taller AWS CodePipeline

Este repositorio queda preparado para sustentar el taller con la API RESTful de estudiantes ubicada en `student-api`.

## Arquitectura elegida

Pipeline propuesto:

1. Fuente: GitHub o AWS CodeCommit.
2. Construccion: AWS CodeBuild ejecuta `npm ci` y `npm test`.
3. Despliegue: AWS Elastic Beanstalk publica la API Node.js.

La API usa `PORT` desde variables de entorno, por lo que puede ejecutarse correctamente en Elastic Beanstalk.

## Archivos principales

- `student-api/Procfile`: arranque web para Elastic Beanstalk.
- `student-api/buildspec.yml`: instrucciones para CodeBuild.
- `student-api/AWS_PIPELINE.md`: guia tecnica de configuracion en AWS.
- `guion_video_aws_pipeline.md`: guion sugerido para el video de maximo 10 minutos.

## Pasos rapidos en AWS

1. Crear una aplicacion y un ambiente web Node.js en Elastic Beanstalk.
2. Crear un proyecto CodeBuild usando `student-api/buildspec.yml`.
3. Crear un CodePipeline con etapas Fuente, Construccion y Despliegue.
4. Conectar la etapa Fuente a este repositorio de GitHub.
5. Hacer un commit pequeno, subirlo al repositorio y verificar que el pipeline se ejecute completo.
6. Tomar capturas de fuente, construccion, despliegue y prueba de la URL publica.

## Comandos de validacion local

```powershell
cd student-api
npm test
npm start
```

Luego validar:

```powershell
curl http://localhost:3000/health
curl http://localhost:3000/students
```
