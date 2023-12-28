const fs = require("fs");
const http = require("http");

http
  .createServer(function (req, res) {
    if (req.url.split("/")[1]) {
      const currPath = process.cwd() + req.url;
      if (fs.existsSync(currPath)) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(fs.readFileSync(currPath));
      } else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("No file found");
      }
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Path not found");
    }
  })
  .listen(9000);
