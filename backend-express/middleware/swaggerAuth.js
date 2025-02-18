// swaggerAuth.js
const swaggerAuth = (req, res, next) => {
    // 이 미들웨어는 "/api-docs" 경로에 마운트되어 있으므로, req.path는 mount 이후의 경로입니다.
    // 만약 정적 파일 요청(예: "/swagger-ui.css", "/swagger-ui-bundle.js" 등)이라면 인증 체크를 건너뛰고 통과시킵니다.
    if (req.path !== '/' && req.path !== '') {
      return next();
    }
    
    // POST 요청: 로그인 폼에서 암호를 제출한 경우
    if (req.method === 'POST') {
      const { password } = req.body;
      if (password && password === process.env.ADMIN_PW) {
        // 인증 성공 시, GET 요청으로 리디렉션 (쿼리 파라미터에 암호 포함)
        return res.redirect(req.originalUrl + '?password=' + encodeURIComponent(password));
      } else {
        // 암호가 틀리면 오류 메시지와 함께 로그인 폼 재표시
        return res.send(`
          <html>
            <head>
              <title>Swagger Authentication</title>
            </head>
            <body>
              <p style="color:red;">Incorrect password, please try again.</p>
              <form method="POST">
                <input type="password" name="password" placeholder="Enter password" required />
                <button type="submit">Submit</button>
              </form>
            </body>
          </html>
        `);
      }
    }
    
    // GET 요청: 쿼리 파라미터로 암호가 제공되었는지 검사
    if (req.method === 'GET') {
      if (req.query.password && req.query.password === process.env.ADMIN_PW) {
        // 올바른 암호가 있을 경우, 다음 미들웨어(즉 Swagger UI)로 진행
        return next();
      } else {
        // 암호가 없거나 틀리면 로그인 폼 표시
        return res.send(`
          <html>
            <head>
              <title>Swagger Authentication</title>
            </head>
            <body>
              <form method="POST">
                <input type="password" name="password" placeholder="Enter password" required />
                <button type="submit">Submit</button>
              </form>
            </body>
          </html>
        `);
      }
    }
  };
  
  module.exports = swaggerAuth;
  