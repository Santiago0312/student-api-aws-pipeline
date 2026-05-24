const { randomUUID } = require("node:crypto");
const http = require("node:http");

const students = new Map();

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);

  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;

      if (body.length > 1_000_000) {
        reject(new Error("PAYLOAD_TOO_LARGE"));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!body.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("INVALID_JSON"));
      }
    });

    req.on("error", reject);
  });
}

function validateStudent(data) {
  const errors = [];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name || typeof data.name !== "string") {
    errors.push("name es obligatorio y debe ser texto.");
  }

  if (!data.lastName || typeof data.lastName !== "string") {
    errors.push("lastName es obligatorio y debe ser texto.");
  }

  if (!data.email || typeof data.email !== "string" || !emailPattern.test(data.email)) {
    errors.push("email es obligatorio y debe tener formato valido.");
  }

  return errors;
}

async function handleRequest(req, res) {
  const url = new URL(req.url, "http://localhost");
  const pathParts = url.pathname.split("/").filter(Boolean);

  if (req.method === "GET" && url.pathname === "/health") {
    sendJson(res, 200, { status: "ok" });
    return;
  }

  if (pathParts[0] !== "students") {
    sendJson(res, 404, { error: "Ruta no encontrada." });
    return;
  }

  if (req.method === "GET" && pathParts.length === 1) {
    sendJson(res, 200, { data: Array.from(students.values()) });
    return;
  }

  if (req.method === "GET" && pathParts.length === 2) {
    const student = students.get(pathParts[1]);

    if (!student) {
      sendJson(res, 404, { error: "Estudiante no encontrado." });
      return;
    }

    sendJson(res, 200, { data: student });
    return;
  }

  if (req.method === "POST" && pathParts.length === 1) {
    try {
      const payload = await readJson(req);
      const errors = validateStudent(payload);

      if (errors.length > 0) {
        sendJson(res, 400, { errors });
        return;
      }

      const student = {
        id: randomUUID(),
        name: payload.name.trim(),
        lastName: payload.lastName.trim(),
        email: payload.email.trim().toLowerCase(),
      };

      students.set(student.id, student);
      sendJson(res, 201, { data: student });
    } catch (error) {
      if (error.message === "INVALID_JSON") {
        sendJson(res, 400, { error: "El cuerpo de la solicitud no es JSON valido." });
        return;
      }

      if (error.message === "PAYLOAD_TOO_LARGE") {
        sendJson(res, 413, { error: "El cuerpo de la solicitud es demasiado grande." });
        return;
      }

      sendJson(res, 500, { error: "Error interno del servidor." });
    }

    return;
  }

  sendJson(res, 405, { error: "Metodo no permitido para este recurso." });
}

function createServer() {
  return http.createServer(handleRequest);
}

function clearStudents() {
  students.clear();
}

module.exports = {
  createServer,
  clearStudents,
};
