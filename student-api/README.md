# API RESTful de Gestion de Estudiantes

Esta solucion implementa una API RESTful con Node.js. Se eligio Node.js porque es liviano, tiene buen soporte para JSON y funciona muy bien en despliegues automatizados. Para mantener la actividad simple y portable, la informacion se guarda en memoria.

## Endpoints

### Verificar salud del servicio

`GET /health`

Respuesta `200 OK`:

```json
{
  "status": "ok"
}
```

### Crear estudiante

`POST /students`

Solicitud:

```json
{
  "name": "Ana",
  "lastName": "Gomez",
  "email": "ana.gomez@example.com"
}
```

Respuesta `201 Created`:

```json
{
  "data": {
    "id": "uuid-generado",
    "name": "Ana",
    "lastName": "Gomez",
    "email": "ana.gomez@example.com"
  }
}
```

### Listar estudiantes

`GET /students`

Respuesta `200 OK`:

```json
{
  "data": [
    {
      "id": "uuid-generado",
      "name": "Ana",
      "lastName": "Gomez",
      "email": "ana.gomez@example.com"
    }
  ]
}
```

### Obtener estudiante por ID

`GET /students/{id}`

Respuesta `200 OK`:

```json
{
  "data": {
    "id": "uuid-generado",
    "name": "Ana",
    "lastName": "Gomez",
    "email": "ana.gomez@example.com"
  }
}
```

Si el estudiante no existe, responde `404 Not Found`.

## Ejecucion local

```powershell
npm test
npm start
```

La API queda disponible en:

```text
http://localhost:3000
```

## Construccion y ejecucion con Docker

Construir la imagen:

```powershell
docker build -t student-api:1.0 .
```

Ejecutar el contenedor:

```powershell
docker run --name student-api -p 3000:3000 student-api:1.0
```

## Despliegue automatico en AWS

La guia completa esta en [`AWS_PIPELINE.md`](AWS_PIPELINE.md).

Resumen del flujo:

```text
GitHub -> AWS CodePipeline -> AWS CodeBuild -> AWS Elastic Beanstalk
```

CodeBuild ejecuta las pruebas y entrega a Elastic Beanstalk el artefacto de despliegue.
