const assert = require("node:assert/strict");
const { after, before, beforeEach, test } = require("node:test");
const { createServer, clearStudents } = require("../src/app");

let server;
let baseUrl;

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

beforeEach(() => {
  clearStudents();
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test("crea un estudiante", async () => {
  const response = await fetch(`${baseUrl}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Ana",
      lastName: "Gomez",
      email: "ana.gomez@example.com",
    }),
  });

  const body = await response.json();

  assert.equal(response.status, 201);
  assert.equal(body.data.name, "Ana");
  assert.equal(body.data.lastName, "Gomez");
  assert.equal(body.data.email, "ana.gomez@example.com");
  assert.ok(body.data.id);
});

test("lista todos los estudiantes registrados", async () => {
  await fetch(`${baseUrl}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Carlos",
      lastName: "Lopez",
      email: "carlos.lopez@example.com",
    }),
  });

  const response = await fetch(`${baseUrl}/students`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.data.length, 1);
  assert.equal(body.data[0].name, "Carlos");
});

test("obtiene un estudiante por id", async () => {
  const createResponse = await fetch(`${baseUrl}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Maria",
      lastName: "Perez",
      email: "maria.perez@example.com",
    }),
  });

  const created = await createResponse.json();
  const response = await fetch(`${baseUrl}/students/${created.data.id}`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body.data, created.data);
});

test("retorna 400 cuando faltan campos obligatorios", async () => {
  const response = await fetch(`${baseUrl}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Sin correo" }),
  });

  const body = await response.json();

  assert.equal(response.status, 400);
  assert.ok(body.errors.length >= 1);
});
