const http = require("http");
const ports = [3001, 3002, 3003, 3004, 3005];
const servers = [];
for (let i = 0; i < ports.length; i++) {
  const server = http.createServer((req, res) => {
    if (req.url === "/stop") {
      res.end(`Server on port ${ports[i]} stopped`);
      server.close();
    } else {
      res.end(`Server running on port ${ports[i]}`);
    }

  });
  server.listen(ports[i]);
  servers.push(server);
}

console.log("Servers running on ports 3001 to 3005");

