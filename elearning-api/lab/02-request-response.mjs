import { createServer } from 'node:http';

// Handler là async vì phần đọc body ở dưới cần `await`.
const server = createServer(async (request, response) => {
  // request.url là CHUỖI THÔ, dính cả query string ('/courses?level=beginner').
  // new URL() tách nó ra thành pathname + searchParams cho ta.
  // Tham số thứ 2 là "gốc" bắt buộc, vì request.url không có domain.
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = url.pathname;
  const method = request.method;

  console.log(`${method} ${pathname}`);

  // ── Route 1: GET /ping ─────────────────────────────────
  if (method === 'GET' && pathname === '/ping') {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return response.end('pong');
  }

  // ── Route 2: GET /courses?level=... ────────────────────
  if (method === 'GET' && pathname === '/courses') {
    // ?? 'all' = giá trị mặc định khi client không gửi tham số.
    const level = url.searchParams.get('level') ?? 'all';
    response.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
    });
    return response.end(JSON.stringify({ level, items: [] }));
  }

  // ── Route 3: POST /courses — đọc body ──────────────────
  if (method === 'POST' && pathname === '/courses') {
    // request LÀ một stream: dữ liệu tới theo từng khúc, không có sẵn.
    let raw = '';
    for await (const chunk of request) {
      raw += chunk;
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      // Client gửi rác → lỗi của CLIENT → 400, không phải 500.
      response.writeHead(400, {
        'Content-Type': 'application/json; charset=utf-8',
      });
      return response.end(
        JSON.stringify({ error: 'Invalid JSON body' }),
      );
    }

    if (!data.title) {
      response.writeHead(400, {
        'Content-Type': 'application/json; charset=utf-8',
      });
      return response.end(JSON.stringify({ error: 'Missing field: title' }));
    }

    // 201 = "đã tạo ra tài nguyên mới". Location chỉ tới nơi nó vừa sinh ra.
    response.writeHead(201, {
      'Content-Type': 'application/json; charset=utf-8',
      Location: '/courses/1',
    });
    return response.end(JSON.stringify({ id: 1, title: data.title }));
  }

  // ── Đúng đường dẫn nhưng sai method → 405 ──────────────
  // Chú ý: nhánh này nằm SAU cùng của nhóm /courses, nên chỉ chạy khi
  // đường dẫn khớp mà không method nào ở trên nhận.
  if (pathname === '/courses') {
    response.writeHead(405, {
      'Content-Type': 'application/json; charset=utf-8',
      // RFC BẮT BUỘC có header Allow trong response 405.
      Allow: 'GET, POST',
    });
    return response.end(
      JSON.stringify({ error: `Method ${method} not allowed here` }),
    );
  }

  // ── Không khớp gì cả → 404 ─────────────────────────────
  // Nhánh này là "lưới an toàn": mọi request lọt tới đây đều CÓ response.
  response.writeHead(404, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(3337, () => {
  console.log('Server listening on http://localhost:3337');
});
