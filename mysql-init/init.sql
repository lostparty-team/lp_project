CREATE DATABASE IF NOT EXISTS lp_project;

USE lp_project;

-- Blacklist 테이블
CREATE TABLE IF NOT EXISTS Blacklist (
  id INT AUTO_INCREMENT PRIMARY KEY, -- 블랙리스트 ID
  title VARCHAR(255) NOT NULL,       -- 글 제목
  author VARCHAR(100) NOT NULL,      -- 작성자 (User 테이블의 user_id와 연결)
  nickname VARCHAR(100) NOT NULL,    -- 닉네임
  reason VARCHAR(255) NOT NULL,      -- 사유
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 생성 시간
  FOREIGN KEY (author) REFERENCES User(user_id) ON DELETE CASCADE -- User와 관계 설정
);

-- User 테이블
CREATE TABLE IF NOT EXISTS User (
  user_id VARCHAR(100) PRIMARY KEY,  -- 유저 아이디
  password VARCHAR(255) NOT NULL,    -- 유저 비밀번호
  api_key VARCHAR(255) UNIQUE NOT NULL -- 유저 API Key
);

-- Cart 테이블
CREATE TABLE IF NOT EXISTS Cart (
  id INT AUTO_INCREMENT PRIMARY KEY, -- 장바구니 ID
  user_id VARCHAR(100) NOT NULL,     -- 유저 아이디 (User 테이블과 연결)
  blacklist_id INT NOT NULL,         -- 담은 글 번호 (Blacklist 테이블의 id와 연결)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 생성 시간
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE, -- User와 관계 설정
  FOREIGN KEY (blacklist_id) REFERENCES Blacklist(id) ON DELETE CASCADE -- Blacklist와 관계 설정
);
