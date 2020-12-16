const http = require('http');
const app = require('./app');
app.set('port', 8000)
const server = http.createServer(app);
server.listen(8000);
console.log('server started on port 8000');