const { createServer } = require("./app");

const port = Number(process.env.PORT || 3000);
const server = createServer();

server.listen(port, "0.0.0.0", () => {
  console.log(`Student API running on port ${port}`);
});
