import { createServer } from 'node:http';

const server = createServer((request, response) => {
  response.writeHead(200, {
    'content-type': 'text/plain; charset=utf-8',
  });

  if (request.url === '/') {
    return response.end('Trang chu');
  }
  if (request.url === '/ping') {
    return response.end('pong');
  }
  if (request.url === '/echo') {
    return response.end(`method: ${request.method}, url: ${request.url}`);
  }
  return response.end('Nothing');
});

server.listen(3336, () => {
  console.log(`Server is running at port 3336`);
});
