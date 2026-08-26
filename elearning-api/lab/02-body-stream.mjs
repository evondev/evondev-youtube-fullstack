import { createServer } from 'node:http';

const server = createServer(async (request, response) => {
  let chunkCount = 0;
  let totalBytes = 0;

  // `request` LÀ một stream đọc được. Vòng lặp này chạy MỖI KHI một khúc dữ liệu
  // vừa tới nơi qua dây mạng — không phải chạy một lần trên toàn bộ body.
  for await (const chunk of request) {
    chunkCount++;
    totalBytes += chunk.length;
  }

  console.log(`Received ${chunkCount} chunks, ${totalBytes} bytes total`);

  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(`chunks=${chunkCount} bytes=${totalBytes}\n`);
});

server.listen(3338, () => {
  console.log('Chunk counter listening on http://localhost:3338');
});
