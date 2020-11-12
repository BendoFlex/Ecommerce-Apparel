const http = require("http")

const server = http.createServer() // http et serveur

const PORT = process.env.PORT || 8080

server.listen(PORT); // écoute au port 8080