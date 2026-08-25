import { createServer } from 'node:http';

const server = createServer(async (request, response) => {
  let soKhuc = 0;
  let tongByte = 0;

  // `request` LÀ một stream đọc được. Vòng lặp này chạy MỖI KHI một khúc dữ liệu
  // vừa tới nơi qua dây mạng — không phải chạy một lần trên toàn bộ body.
  for await (const khuc of request) {
    soKhuc++;
    tongByte += khuc.length;
  }

  console.log(`Nhan ${soKhuc} khuc, tong ${tongByte} byte`);

  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(`khuc=${soKhuc} byte=${tongByte}\n`);
});

server.listen(3338, () => {
  console.log('Server dem khuc dang nghe tai http://localhost:3338');
});
