const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const publicDirectoryPath = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  const filePath = path.join(
    publicDirectoryPath,
    req.url === "/" ? "index.html" : req.url
  );
  const extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // File not found
        res.writeHead(404);
        res.end("404 Not Found");
      } else {
        // Server error
        res.writeHead(500);
        res.end(`500 Internal Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
