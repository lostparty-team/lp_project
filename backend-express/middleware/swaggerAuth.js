// middleware/swaggerAuth.js
const swaggerAuth = (req, res, next) => {
  // Swagger 정적 리소스 (JS, CSS 등)은 인증 없이 통과
  if (req.path !== '/' && req.path !== '') {
    return next();
  }

  // 인증된 쿠키가 있다면 Swagger UI 접근 허용
  if (req.cookies?.swaggerAuth === 'true') {
    return next();
  }

  // 로그인 폼 제출 (POST 방식)
  if (req.method === 'POST') {
    const { password } = req.body;

    if (password && password === process.env.ADMIN_PW) {
      // 인증 성공 → 쿠키 저장 (httpOnly 옵션 추가)
      res.cookie('swaggerAuth', 'true', {
        httpOnly: true,
        secure: true,        // HTTPS 환경일 경우
        sameSite: 'Strict'   // 보안 정책 강화
      });
      return res.redirect(req.originalUrl);
    }

    // 실패 시 로그인 폼 다시 표시
    return res.send(`
      <html>
        <head><title>Swagger Authentication</title></head>
        <body>
          <p style="color:red;">비밀번호가 올바르지 않습니다.</p>
          <form method="POST">
            <input type="password" name="password" placeholder="비밀번호 입력" required />
            <button type="submit">로그인</button>
          </form>
        </body>
      </html>
    `);
  }

  // 인증 안 된 사용자에게 로그인 폼 표시
  return res.send(`
    <html>
      <head><title>Swagger Authentication</title></head>
      <body>
        <form method="POST">
          <input type="password" name="password" placeholder="비밀번호 입력" required />
          <button type="submit">로그인</button>
        </form>
      </body>
    </html>
  `);
};

module.exports = swaggerAuth;
