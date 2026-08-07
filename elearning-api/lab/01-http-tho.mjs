import { createServer } from 'node:http';

const server = createServer((request, response) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);

  response.writeHead(200, {
    'content-type': 'text/plain; charset=utf-8',
  });

  response.end('Xin chao tu server tư viet!\n');
});

server.listen(3334, () => {
  console.log('Server dang nghe tai http://localhost:3334');
});
